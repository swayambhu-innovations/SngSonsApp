import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { LoadingController, ModalController } from "@ionic/angular";
import { Config } from "src/app/config";
import { SharedService } from "src/app/shared/shared.service";
import { NotificationService } from "src/app/utils/notification";
import { VehicleCategoryService } from "./vehicle-category.service";

@Component({
    selector: 'app-vehicle-category',
    templateUrl: './vehicle-category.component.html',
    styleUrls: ['./vehicle-category.component.scss']
})

export class VehicleCategoryComponent implements OnInit {
    presentingElement: any = '' || null;
    vehicleCategoryForm: FormGroup = new FormGroup({
        categoryName: new FormControl('', [Validators.required]),
        weightCapacity: new FormControl(0, [Validators.required]),
        minimumFuel: new FormControl(0, [Validators.required]),
        maximumFuel: new FormControl(0, [Validators.required]),
        minimumToll: new FormControl(0, [Validators.required]),
        maximumToll: new FormControl(0, [Validators.required]),
        defaultKOTCapacity: new FormControl(0, [Validators.required]),
        defaultFuelType: new FormControl('', [Validators.required]),
        active: new FormControl(true, []),
        createdAt: new FormControl(new Date(), []),
        id: new FormControl(''),
        count: new FormControl(0)
    });
    public formInitalValue = this.vehicleCategoryForm.value;
    public loader: any;
    vehicleCategoryData: any[] = [];
    public isModalOpen: boolean = false;
    public showConfirm: boolean = false;
    public deleteId: any;

    constructor(
        private notification: NotificationService,
        private loadingController: LoadingController,
        private sharedService: SharedService,
        private vehicleCateoryService: VehicleCategoryService,
        private modalCtrl: ModalController
    ) {
        this.sharedService.refresh.subscribe((data) => {
            if (data) {
                this.getVehicleCategoryData();
            }
        });
    }

    async ngOnInit() {
        this.loader = await this.loadingController.create({ message: Config.messages.pleaseWait })
        this.presentingElement = document.querySelector('.ion-category-page');
        this.getVehicleCategoryData();

    }

    async submitForm() {
        if (!this.vehicleCategoryForm.valid) {
            this.vehicleCategoryForm.markAllAsTouched();
            return;
        }
        this.loader.present();
        const formData = this.vehicleCategoryForm.value;
        await this.vehicleCateoryService.addVehicleCategoryData(formData);
        this.notification.showSuccess(!formData ? Config.messages.addedSuccessfully : Config.messages.updatedSuccessfully);
        this.vehicleCategoryForm.reset(this.formInitalValue);
        await this.getVehicleCategoryData();
        this.loader.dismiss();
        this.modalCtrl.dismiss();
        this.isModalOpen = false;
    }

    async getVehicleCategoryData() {
        this.loader.present();
        const data = await this.vehicleCateoryService.getVehicleCategoryData();
        this.vehicleCategoryData = data.docs.map((category) => {
            return { ...category.data(), id: category.id }
        });
        console.log(data.docs);
        console.log(this.vehicleCategoryData);
        this.loader.dismiss();
    }

    async updVehicleCategoryStatus($event: any, cateoryId: string, status: boolean) {
        $event.stopPropagation();
        this.loader.present();
        await this.vehicleCateoryService.updVehicleCategoryStatus(cateoryId, status);
        await this.getVehicleCategoryData();
        this.loader.dismiss();
    }

    async delete(confirmation: any) {
        if (confirmation) {
            this.loader.present();
            await this.vehicleCateoryService.deleteSettings(this.deleteId);
            await this.getVehicleCategoryData()
            this.loader.dismiss();
            this.notification.showSuccess(
                Config.messages.deletedSuccessfully
            );
        }
        this.showConfirm = false;
    }
}