import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  LoadingController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Config } from 'src/app/config';
import { NotificationService } from 'src/app/utils/notification';
import { AccountExpenseService } from './account-expense.service';
import { isEmpty } from 'lodash';
import { SharedService } from 'src/app/shared/shared.service';
import { HomeService } from 'src/app/main/home/home.service';
import { ShipmentsService } from 'src/app/main/home/tabs/shipments/shipments.service';

@Component({
  selector: 'app-account-expense',
  templateUrl: './account-expense.component.html',
  styleUrls: ['./account-expense.component.scss'],
})
export class AccountExpenseComponent implements OnInit {
  shipments: any;
  constructor(
    private notification: NotificationService,
    private loadingController: LoadingController,
    private accountExpenseService: AccountExpenseService,
    private sharedService: SharedService,
    private shipmentService: ShipmentsService,
    public homeService: HomeService,
    private navCtrl: NavController
  ) {
    this.sharedService.refresh.subscribe((data) => {
      if (data) {
        this.init();
      }
    });
  }

  private loader: any;
  private config = Config;
  public accountList: any;
  public accountMapping: any = {};
  public expenseList: any;
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
    id: new FormControl(''),
  });
  public initialAccountValues = this.accountForm.value;

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

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
  }

  async ionViewWillEnter() {
    this.init();
  }

  init() {
    this.getAccounts().then(() =>
      this.getExpense().then(() => {
        this.expenseList.map((expense: any) => {
          this.accountList?.map((account: any) => {
            if (account.id == expense.account)
              expense['accountName'] = account['accountName'];
          });
        });
      })
    );
  }

  dismissModal = async () => {
    this.openAccount = false;
    this.openExpense = false;
    this.accountForm.reset(this.initialAccountValues);
    this.expenseForm.reset(this.initialExpenseValues);
    return true;
  };

  openExpenseDetail(expense: any) {
    this.navCtrl.navigateForward(
      '/main/settings/account-expense/expense-details',
      {
        state: {
          expense: JSON.stringify(expense),
        },
      }
    );
  }

  openAccountDetail(account: any) {
    this.navCtrl.navigateForward(
      '/main/settings/account-expense/account-details',
      {
        state: {
          account: JSON.stringify(account),
        },
      }
    );
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
    this.init();
    this.notification.showSuccess(
      !formData.id
        ? this.config.messages.addedSuccessfully
        : this.config.messages.updatedSuccessfully
    );
    this.openAccount = false;
    this.loader.dismiss();
  }

  async getAccounts() {
    this.loader?.present();
    const data = await this.accountExpenseService.getAccounts();
    let accountsData: any = {};
    Object.keys(accountsData).map((key) => {
      accountsData[key];
    });
    console.log(accountsData);
    data.docs.map((account) => {
      accountsData[account.id] = { ...account.data(), id: account.id };
    });

    this.shipmentService.getAllShipments().then((shipmentData) => {
      this.shipments = shipmentData.docs.map((shipment) => {
        return { ...shipment.data(), id: shipment.id };
      });
      Object.keys(accountsData).map((key, index) => {
        accountsData[key]['serialNo'] = index + 1;
        accountsData[key]['totalDieselExpenseAmount'] = 0;
        accountsData[key]['totalFreightExpenseAmount'] = 0;
        accountsData[key]['totalKhurakiExpenseAmount'] = 0;
        // accountsData[key]['totalLabourExpenseAmount'] = 0;
        accountsData[key]['totalOtherExpenseAmount'] = 0;
        accountsData[key]['totalRepairExpenseAmount'] = 0;
        accountsData[key]['totalTollExpenseAmount'] = 0;
      });
      this.shipments.map((shipment: any) => {
        if (shipment.voucherData) {
          accountsData[shipment.voucherData.dieselExpenseBank][
            'totalDieselExpenseAmount'
          ] += +shipment.voucherData.dieselExpenseAmount || 0;
          accountsData[shipment.voucherData.freightExpenseBank][
            'totalFreightExpenseAmount'
          ] += +shipment.voucherData.freightExpenseAmount || 0;
          accountsData[shipment.voucherData.khurakiExpenseBank][
            'totalKhurakiExpenseAmount'
          ] += +shipment.voucherData.khurakiExpenseAmount || 0;
          // accountsData[shipment.voucherData.labourExpenseBank][
          //   'totalLabourExpenseAmount'
          // ] += +shipment.voucherData.labourExpenseAmount || 0;
          accountsData[shipment.voucherData.otherExpenseBank][
            'totalOtherExpenseAmount'
          ] += +shipment.voucherData.otherExpenseAmount || 0;
          accountsData[shipment.voucherData.repairExpenseBank][
            'totalRepairExpenseAmount'
          ] += +shipment.voucherData.repairExpenseAmount || 0;
          accountsData[shipment.voucherData.tollExpenseBank][
            'totalTollExpenseAmount'
          ] += +shipment.voucherData.tollExpenseAmount || 0;
        }
      });
      Object.keys(accountsData).map((key) => {
        accountsData[key].totalExpense =
          accountsData[key]['totalDieselExpenseAmount'] +
          accountsData[key]['totalFreightExpenseAmount'] +
          accountsData[key]['totalKhurakiExpenseAmount'] +
          // accountsData[key]['totalLabourExpenseAmount'] +
          accountsData[key]['totalOtherExpenseAmount'] +
          accountsData[key]['totalRepairExpenseAmount'] +
          accountsData[key]['totalTollExpenseAmount'];
      });
      this.accountList = Object.keys(accountsData).map(
        (key) => accountsData[key]
      );
      accountsData = {};
    });
    this.loader.dismiss();
  }

  async updAccountStatus($event: any, accountId: string, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.accountExpenseService.updAccountStatus(accountId, status);
    this.init();
    this.loader.dismiss();
  }

  editAccount(account: any) {
    this.accountForm.setValue(account);
    this.openAccount = true;
  }

  async delete(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      if (this.toDelete.section === 'account')
        await this.accountExpenseService.deleteAccount(this.toDelete.id);
      else await this.accountExpenseService.deleteExpenseType(this.toDelete.id);
      this.init();

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
    this.notification.showSuccess(
      !formData.id
        ? this.config.messages.addedSuccessfully
        : this.config.messages.updatedSuccessfully
    );
    this.openExpense = false;
    this.loader.dismiss();
  }

  async getExpense() {
    this.loader.present();
    const data = await this.accountExpenseService.getExpenseType();
    this.expenseList = data.docs.map((expense) => {
      return { ...expense.data(), id: expense.id };
    });
    this.loader.dismiss();
  }

  async updExpenseStatus($event: any, expenseId: string, status: boolean) {
    $event.stopPropagation();
    this.loader.present();
    await this.accountExpenseService.updExpenseType(expenseId, status);
    this.init();
    this.loader.dismiss();
  }

  editExpense(expense: any) {
    this.expenseForm.setValue(expense);
    this.openExpense = true;
  }
}
