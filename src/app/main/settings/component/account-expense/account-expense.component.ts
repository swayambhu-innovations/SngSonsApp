import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { LoadingController, ModalController } from "@ionic/angular";
import { Config } from "src/app/config";
import { NotificationService } from "src/app/utils/notification";
import { AccountExpenseService } from "./account-expense.service";
import { isEmpty } from 'lodash';
import { SharedService } from "src/app/shared/shared.service";

@Component({
    selector: 'app-account-expense',
    templateUrl: './account-expense.component.html',
    styleUrls: ['./account-expense.component.scss']
})

export class AccountExpenseComponent implements OnInit {
    constructor(
        private notification: NotificationService,
        private loadingController: LoadingController,
        private accountExpenseService: AccountExpenseService,
        private sharedService: SharedService
    ) {
        this.sharedService.refresh.subscribe((data) => {
            if (data) {
                this.init();
            }
        });
    }

    private loader: any;
    private config = Config;
    public accountList: any[] = [];
    public accountMapping: any = {};
    public expenseList: any[] = [];
    public openAccount = false;
    public openExpense = false;
    public showConfirm = false;
    public toDelete: any;

    accountForm: FormGroup = new FormGroup({
        accountName: new FormControl('', [Validators.required]),
        shipmentLimit: new FormControl('', [Validators.required]),
        dispenseLimit: new FormControl('', [Validators.required]),
        active: new FormControl(true, []),
        createdAt: new FormControl(new Date(), []),
        id: new FormControl('')
    });
    public initialAccountValues = this.accountForm.value;

    expenseForm: FormGroup = new FormGroup({
        expenseName: new FormControl('', [Validators.required]),
        minDispense: new FormControl('', [Validators.required]),
        maxDispense: new FormControl('', [Validators.required]),
        account: new FormControl('', [Validators.required]),
        active: new FormControl(true, []),
        createdAt: new FormControl(new Date(), []),
        id: new FormControl('')
    });
    public initialExpenseValues = this.expenseForm.value;

    async ngOnInit() {
        this.loader = await this.loadingController.create({ message: Config.messages.pleaseWait })
        this.init();
    }

    init() {
        this.getAccounts();
        this.getExpense();
    }

    dismissModal = async () => {
        this.openAccount = false;
        this.openExpense = false;
        this.accountForm.reset(this.initialAccountValues);
        this.expenseForm.reset(this.initialExpenseValues);
        return true;
    }

    async addAccount() {
        if (!this.accountForm.valid) {
            this.accountForm.markAllAsTouched();
            return;
        }
        this.loader.present();
        const formData = this.accountForm.value;
        await this.accountExpenseService.addAccounts(formData);
        this.accountForm.reset(this.initialAccountValues);
        this.getAccounts();
        this.notification.showSuccess(!formData.id ? this.config.messages.addedSuccessfully : this.config.messages.updatedSuccessfully);
        this.openAccount = false;
        this.loader.dismiss();
    }

    async getAccounts() {
        this.loader.present();
        const data = await this.accountExpenseService.getAccounts();
        this.accountList = data.docs.map((account) => {
            this.accountMapping[account.id] = account.data()['accountName'];
            return { ...account.data(), id: account.id }
        });
        this.loader.dismiss();
    }

    async updAccountStatus($event: any, accountId: string, status: boolean) {
        $event.stopPropagation();
        this.loader.present();
        await this.accountExpenseService.updAccountStatus(accountId, status);
        await this.getAccounts();
        this.loader.dismiss();
    }

    editAccount(account: any) {
        this.accountForm.setValue(account);
        this.openAccount = true;
    }

    async delete(confirmation: any) {
        if (confirmation) {
            this.loader.present();
            if (this.toDelete.section === 'account') {
                await this.accountExpenseService.deleteAccount(this.toDelete.id);
                await this.getAccounts();
            } else {
                await this.accountExpenseService.deleteExpenseType(this.toDelete.id);
                await this.getExpense();
            }
            
            this.loader.dismiss();
            this.notification.showSuccess(this.config.messages.deletedSuccessfully);
        }
        this.showConfirm = false;
    }

    async addExpense() {
        if (!this.expenseForm.valid) {
            this.expenseForm.markAllAsTouched();
            return;
        }
        this.loader.present();
        const formData = this.expenseForm.value;
        await this.accountExpenseService.addExpenseType(formData);
        this.expenseForm.reset(this.initialExpenseValues);
        this.getExpense();
        this.notification.showSuccess(!formData.id ? this.config.messages.addedSuccessfully : this.config.messages.updatedSuccessfully);
        this.openExpense = false;
        this.loader.dismiss();
    }

    async getExpense() {
        this.loader.present();
        const data = await this.accountExpenseService.getExpenseType();
        this.expenseList = data.docs.map((expense) => {
            return { ...expense.data(), id: expense.id }
        });
        this.loader.dismiss();
    }

    async updExpenseStatus($event: any, expenseId: string, status: boolean) {
        $event.stopPropagation();
        this.loader.present();
        await this.accountExpenseService.updExpenseType(expenseId, status);
        await this.getExpense();
        this.loader.dismiss();
    }

    editExpense(expense: any) {
        this.expenseForm.setValue(expense);
        this.openExpense = true;
    }
}