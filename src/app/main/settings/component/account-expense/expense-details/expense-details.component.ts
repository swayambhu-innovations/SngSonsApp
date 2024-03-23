import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { NotificationService } from 'src/app/utils/notification';
import { AccountExpenseService } from '../account-expense.service';
import { Config } from 'src/app/config';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss'],
})
export class ExpenseDetailsComponent implements OnInit {
  private loader: any;
  public toDelete: any;
  public showConfirm: boolean = false;
  public expenseData: any; // store details of expense

  expenseForm: FormGroup = new FormGroup({
    expenseName: new FormControl('', [Validators.required]),
    accountName: new FormControl(''),
    minDispense: new FormControl('', [Validators.required]),
    maxDispense: new FormControl('', [Validators.required]),
    account: new FormControl('', [Validators.required]),
    active: new FormControl(true, []),
    createdAt: new FormControl(new Date(), []),
    id: new FormControl(''),
  });
  public initialExpenseValues = this.expenseForm.value;
  public openExpense = false;

  public accountMapping: any = {};
  public accountList: any[] = [];
  tableData = [
    { name: 'Shipment ID', key: 'ShipmentNumber', size: '4' },
    { name: 'Party Name', key: 'CustomerName', size: '3' },
    { name: 'Area', key: 'WSTown', size: '3' },
  ];

  constructor(
    private navCtrl: NavController,
    private notification: NotificationService,
    private accountExpenseService: AccountExpenseService,
    private loadingController: LoadingController,
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    if (history.state.expense)
      this.expenseData = JSON.parse(history.state.expense);
    this.getAccounts();

    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
  }

  async updExpenseStatus($event: any, expenseId: string, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.accountExpenseService.updExpenseType(expenseId, status);
    this.loader.dismiss();
  }

  dismissModal = async () => {
    this.openExpense = false;
    this.expenseForm.reset(this.initialExpenseValues);
    return true;
  };

  async getAccounts() {
    const data = await this.accountExpenseService.getAccounts();
    this.accountList = data.docs.map((account) => {
      this.accountMapping[account.id] = account.data()['accountName'];
      return { ...account.data(), id: account.id };
    });
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
    this.notification.showSuccess(
      !formData.id
        ? Config.messages.addedSuccessfully
        : Config.messages.updatedSuccessfully
    );
    this.openExpense = false;
    this.loader.dismiss();
  }

  editExpense(expense: any) {
    this.expenseForm.setValue(expense);
    this.openExpense = true;
  }

  async deleteExpense(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      //   await this.vehicleMasterService.deleteVehicle(
      //     this.vehicleCat.id,
      //     this.toDelete.id
      //   );
      this.loader.dismiss();
      this.notificationService.showSuccess(Config.messages.deletedSuccessfully);
      this.navCtrl.navigateForward(['main/settings/vehicle-master']);
    }
    this.showConfirm = false;
  }

  goBack() {
    this.navCtrl.back();
  }
}
