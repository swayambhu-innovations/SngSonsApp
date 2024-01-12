import { Component } from "@angular/core";
import { LoadingController } from "@ionic/angular";
import { NotificationService } from "src/app/utils/notification";
import { SharedService } from "src/app/shared/shared.service";
import { Config } from "src/app/config";
import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserPermissionService } from "./user-permission.service";
import { createUserWithEmailAndPassword, getAuth } from "@angular/fire/auth";

@Component({
    selector: 'app-user-permission',
    templateUrl: './user-permission.component.html',
    styleUrls: ['./user-permission.component.scss']
})

export class UserPermissionComponent {
    constructor(
        private notification: NotificationService,
        private loadingController: LoadingController,
        private userPermissionService: UserPermissionService,
        private sharedService: SharedService
    ) {
        this.sharedService.refresh.subscribe((data) => {
            if (data) {
                this.init();
            }
        });
    }

    public openRole = false;
    public openUser = false;

    private loader: any;
    private config = Config;
    public rolesList: any[] = [];
    public roleMapping: any = {};
    public usersList: any[] = [];
    public showConfirm = false;
    public toDelete: any;

    async ngOnInit() {
        this.loader = await this.loadingController.create({ message: Config.messages.pleaseWait })
        this.init();
    }

    init() {
        this.getRoles();
        this.getUsers();
    }

    get phoneEnabled() {
        return !!this.userForm.value.id;
    }

    roleForm: FormGroup = new FormGroup({
        roleName: new FormControl('', [Validators.required]),
        access: new FormGroup({
            upload_new_zsd_file: new FormControl(true, []),
            fill_shipment_voucher: new FormControl(true, []),
            fill_post_delivery_form: new FormControl(true, []),
            discard_vouchers: new FormControl(true, []),
            edit_account_settings: new FormControl(true, []),
            view_reports: new FormControl(true, []),
        }),
        active: new FormControl(true, []),
        createdAt: new FormControl(new Date(), []),
        id: new FormControl('')
    });
    public initialRoleValues = { ...this.roleForm.value };

    userForm: FormGroup = new FormGroup({
        userName: new FormControl('', [Validators.required]),
        email: new FormControl('', []),
        phone: new FormControl('', [Validators.required]),
        roleType: new FormControl('role', []),
        access: new FormGroup({
            upload_new_zsd_file: new FormControl(true, []),
            fill_shipment_voucher: new FormControl(true, []),
            fill_post_delivery_form: new FormControl(true, []),
            discard_vouchers: new FormControl(true, []),
            edit_account_settings: new FormControl(true, []),
            view_reports: new FormControl(true, []),
        }),
        role: new FormControl('', []),
        roleName: new FormControl('', []),
        active: new FormControl(true, []),
        createdAt: new FormControl(new Date(), []),
        id: new FormControl('')
    });
    public initialUserValues = { ...this.userForm.value };

    dismissModal = async () => {
        this.openRole = false;
        this.openUser = false;
        this.roleForm.reset(this.initialRoleValues);
        this.userForm.reset(this.initialUserValues);
        return true;
    }

    async addRole() {
        if (!this.roleForm.valid) {
            this.roleForm.markAllAsTouched();
            return;
        }
        this.loader.present();
        const formData = this.roleForm.value;
        await this.userPermissionService.addRole(formData);
        this.roleForm.reset(this.initialRoleValues);
        this.getRoles();
        this.notification.showSuccess(!formData.id ? this.config.messages.addedSuccessfully : this.config.messages.updatedSuccessfully);
        this.openRole = false;
        this.loader.dismiss();
    }

    async getRoles() {
        this.loader.present();
        const data = await this.userPermissionService.getRoles();
        this.rolesList = data.docs.map((role) => {
            this.roleMapping[role.id] = role.data();
            return { ...role.data(), id: role.id }
        });
        this.loader.dismiss();
    }

    async updRoleStatus($event: any, roleId: string, status: boolean) {
        $event.stopPropagation();
        this.loader.present();
        await this.userPermissionService.updRoleStatus(roleId, status);
        await this.getRoles();
        this.loader.dismiss();
    }

    editRole(account: any) {
        this.roleForm.setValue(account);
        this.openRole = true;
    }

    async delete(confirmation: any) {
        if (confirmation) {
            this.loader.present();
            if (this.toDelete.section === 'role') {
                await this.userPermissionService.deleteAccount(this.toDelete.id);
                await this.getRoles();
            } else {
                await this.userPermissionService.deleteUser(this.toDelete.id);
                await this.getUsers();
            }

            this.loader.dismiss();
            this.notification.showSuccess(this.config.messages.deletedSuccessfully);
        }
        this.showConfirm = false;
    }

    async addUser() {
        if (!this.userForm.valid) {
            this.userForm.markAllAsTouched();
            return;
        }
        this.loader.present();
        const formData = this.userForm.value;
        if (formData.roleType === 'role') {
            formData.access = this.roleMapping[formData.role].access;
            formData.roleName = this.roleMapping[formData.role].roleName;
        }
        if (!formData.id) {
            await this.userPermissionService.checkContactNumber(formData.phone).then(async (data) => {
                if (data.docs && data.docs.length > 0) {
                    this.notification.showError(this.config.messages.contactExist);
                } else {
                    await this.userPermissionService.addUser(formData);
                    this.userForm.reset(this.initialUserValues);
                    this.getUsers();
                    this.notification.showSuccess(!formData.id ? this.config.messages.addedSuccessfully : this.config.messages.updatedSuccessfully);
                    this.openUser = false;
                }
                this.loader.dismiss();
            });
        } else {
            await this.userPermissionService.addUser(formData);
            this.userForm.reset(this.initialUserValues);
            this.getUsers();
            this.notification.showSuccess(!formData.id ? this.config.messages.addedSuccessfully : this.config.messages.updatedSuccessfully);
            this.openUser = false;
            this.loader.dismiss();
        }
    }

    async getUsers() {
        this.loader.present();
        const data = await this.userPermissionService.getUsers();
        this.usersList = data.docs.map((user) => {
            return { ...user.data(), id: user.id }
        });
        this.loader.dismiss();
    }

    async updUserStatus($event: any, userId: string, status: boolean) {
        $event.stopPropagation();
        this.loader.present();
        await this.userPermissionService.updUserStatus(userId, status);
        await this.getUsers();
        this.loader.dismiss();
    }

    editUser(account: any) {
        this.userForm.patchValue(account);
        this.openUser = true;
    }
}