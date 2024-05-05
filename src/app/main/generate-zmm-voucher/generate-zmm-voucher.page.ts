import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { UtilService } from 'src/app/utils/util';
import { formatDate, formatDateJS } from 'src/app/utils/date-util';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import { NotificationService } from 'src/app/utils/notification';
import { ShipmentDetailService } from '../shipment-detail/shipment-detail.service';
import { HomeService } from '../home/home.service';
import { AccountExpenseService } from '../settings/component/account-expense/account-expense.service';
import { LabourMasterService } from '../settings/component/labour-master/labour-master.service';
import { RecievingStatus } from 'src/app/utils/enum';
import { Config } from 'src/app/config';
import * as moment from 'moment';
import { ReceivingsService } from '../home/tabs/vendors/receivings.service';
import { RecievingDetailService } from '../recieving-detail/recieving-detail.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-generate-zmm-voucher',
  templateUrl: './generate-zmm-voucher.page.html',
  styleUrls: ['./generate-zmm-voucher.page.scss'],
})
export class GenerateZmmVoucherPage implements OnInit {
  isDone: boolean = false;
  id: any;
  isPDF: boolean = false;
  isExcel: boolean = false;
  loader: any;
  shipmentDetails: any = {};
  formatDate = formatDate;
  config = Config;
  showConfirm = false;
  RecievingStatus = RecievingStatus;
  isSuspended = false;
  accounts: any[] = [];
  expense: any = {};
  expenseAccount: any = {};
  labours: any[] = [];
  recievingDetails: any = {};
  dispatchDate: any;
  expDeliveryDate: any;
  gateEntryDate: any;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private receivingsService: ReceivingsService,
    private loadingController: LoadingController,
    private notification: NotificationService,
    private recievingsService: ReceivingsService,
    public homeService: HomeService,
    private sharedService: SharedService,
    private accountExpenseService: AccountExpenseService,
    private labourMasterService: LabourMasterService,
    private recievingDetailService: RecievingDetailService,
    private utilService: UtilService
  ) {
    this.sharedService.refresh.subscribe((data) => {
      if (data) {
        this.getRecievingDetails();
      }
    });
  }

  userName: string = '';
  totalExpense: any = 0;

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.id = this.route.snapshot.paramMap.get('id');
    const data: any = this.utilService.getUserdata();
    this.userName = data?.access?.userName || '';
    await this.getAccounts();
    // await this.getExpense();
    await this.getLabours();
    await this.getRecievingDetails();
    await this.getExpenseType();
  }

  voucherForm: FormGroup = new FormGroup({
    id: new FormControl(this.recievingDetails?.id, [Validators.required]),
    dieselExpenseBank: new FormControl(''),
    dieselExpenseAmount: new FormControl(0, [Validators.required]),
    labour: new FormControl(''),
    labourExpenseBank: new FormControl(''),
    labourExpenseAmount: new FormControl(0, [Validators.required]),
    khurakiExpenseBank: new FormControl(''),
    khurakiExpenseAmount: new FormControl(0, [Validators.required]),
    freightExpenseBank: new FormControl(''),
    freightExpenseAmount: new FormControl(0, [Validators.required]),
    tollExpenseBank: new FormControl(''),
    tollExpenseAmount: new FormControl(0, [Validators.required]),
    repairExpenseBank: new FormControl(''),
    repairExpenseAmount: new FormControl(0, [Validators.required]),
    otherExpenseBank: new FormControl(''),
    otherExpenseAmount: new FormControl(0, [Validators.required]),
    remark: new FormControl('', []),
    createdAt: new FormControl(new Date(), []),
    createdById: new FormControl('', []),
    createdByName: new FormControl(this.userName, []),
  });

  goBack() {
    this.navCtrl.back();
  }

  selectedAccount: any[] = [];
  expenseList: any[] = [];

  selectAccount(event: any, expense: any) {
    let account = event.value;
    let obj = {
      accountName: account.accountName,
      accountID: account.id,
      expenseName: expense.expenseName,
      expenseID: expense.id,
      amount: 0,
    };
    expense.accountWarning = false;
    this.selectedAccount.push(obj);
  }

  updateAccountValue(expense: any, event: any) {
    console.log(expense, event.target.value);
    expense.accountWarning = true;
    let isAccountSelected: boolean = false;
    if (this.selectedAccount.length > 0) {
      this.selectedAccount.map((account) => {
        if (account.expenseID == expense.id) {
          isAccountSelected = true;
          const currentAccountAmount = parseFloat(account.amount);
          const newExpenseValue = parseFloat(event.target.value);

          this.totalExpense =
            this.totalExpense - currentAccountAmount + newExpenseValue;

          account.amount = newExpenseValue;
        }
      });
      if (!isAccountSelected) {
        expense.target.value.accountWarning = true;
      }
    }
    if (!isAccountSelected) {
      expense.accountWarning = true;
      console.log(expense);
    } else {
      expense.accountWarning = false;

      const value = parseFloat(event.target.value);

      if (
        value != 0 &&
        (value < expense.minDispense || value > expense.maxDispense)
      ) {
        expense.amountWarning = true;
      } else {
        expense.amountWarning = false;
      }
      console.log('selected account', this.selectedAccount);
    }
  }

  async getExpenseType() {
    const data = await this.accountExpenseService.getExpenseType();
    data.docs.map((expense) => {
      console.log(expense.data());
      const expenseData = expense.data();
      console.log(expenseData)
      this.expenseList.push({
        ...expense.data(),
        id: expense.id,
        amountWarning: false,
        accountWarning: false,
      });
    });
  }

  get createdAt() {
    const data = this.voucherForm.value;
    return formatDate(data.createdAt, 'DD MMM YYYY');
  }

  get createdByName() {
    const data = this.voucherForm.value;
    return data.createdByName;
  }

  async getRecievingDetails() {
    this.loader.present();
    (await this.recievingsService.getRecievingsById(this.id)).docs.map(
      async (recieving: any) => {
        const recievingData = {
          ...recieving.data(),
          id: recieving.id,
          supplier: [],
        };
        this.recievingDetails =
          await this.recievingDetailService.formatReceiving(recievingData);

        this.dispatchDate = new Date(
          parseInt(this.recievingDetails?.dispatchDate)
        ).toDateString();

        this.expDeliveryDate = new Date(
          parseInt(this.recievingDetails?.expDeliverDate)
        ).toDateString();

        this.gateEntryDate = new Date(
          parseInt(this.recievingDetails?.gateEntryDate)
        ).toDateString();

        console.log(this.recievingDetails);
      }
    );
    this.loader.dismiss();
  }

  async getAccounts() {
    (await this.accountExpenseService.getAccounts()).docs.map((item: any) => {
      const data = { ...item.data(), id: item.id };
      if (data.active) {
        this.accounts.push(data);
      }
    });
  }

  // async getExpense() {
  //   (await this.accountExpenseService.getExpenseType()).docs.map(
  //     (item: any) => {
  //       const data = { ...item.data(), id: item.id };
  //       if (data.active) {
  //         this.expense[data.expenseName] = data;
  //         this.expenseAccount[data.account] = data;
  //         console.log(data);
  //       }
  //     }
  //   );
  // }

  async getLabours() {
    (await this.labourMasterService.getLabourParty()).docs.map((item: any) => {
      const data = { ...item.data(), id: item.id };
      if (data.active) {
        this.labours.push(data);
      }
    });
  }

  checkValidAmount(formData: any, bank: string, amount: string, key: string) {
    const expense = this.expenseAccount[formData.voucherData[bank]];
    if (
      formData.voucherData[amount] != 0 &&
      (formData.voucherData[amount] < expense.minDispense ||
        formData.voucherData[amount] > expense.maxDispense)
    ) {
      this.notification.showError(
        `${Config.messages.invalidAmount}for ${key} Expense`
      );
      return false;
    }
    return true;
  }
  async addVoucher(stat: string) {
    let submit: boolean = true;
    this.voucherForm.patchValue({
      id: this.id,
      createdByName: this.userName,
    });

    console.log(this.voucherForm.value);

    if (!this.voucherForm.valid) {
      this.voucherForm.markAllAsTouched();
      this.notification.showError(this.config.messages.fillAllExpenses);
      return;
    }

    const formData: any = {
      voucherData: this.voucherForm.value,
      expenseList: this.selectedAccount,
      totalExpense: this.totalExpense,
    };

    this.selectedAccount.map((selectExpense) => {
      this.expenseList.map((expense) => {
        if (selectExpense.expenseID == expense.id) {
          if (
            selectExpense.amount != 0 &&
            (selectExpense.amount < expense.minDispense ||
              selectExpense.amount > expense.maxDispense)
          ) {
            console.log('invalid');
            submit = false;
            return;
          }
        }
      });
    });

    console.log(formData);

    if (submit) {
      this.loader = await this.loadingController.create({
        message: Config.messages.pleaseWait,
      });
      // this.loader.present();
      if (stat === 'Submit') {
        console.log('status');
        formData['status'] = RecievingStatus.Completed;
      }
      await this.receivingsService.updRecievingVoucher(this.id, formData);
      if (stat === 'Submit') {
        this.selectedAccount.map(async (account) => {
          await this.receivingsService.addAccountExpense(
            account.accountID,
            `${this.id}-${account.expenseName}`,
            {
              amount: account.amount,
              date: new Date(),
              recievingId: this.id,
            },
            moment(new Date()).format('MMYYYY')
          );
        });

        //   if(formData.voucherData.dieselExpenseBank){
        //   await this.receivingsService.addAccountExpense(
        //     formData.voucherData.dieselExpenseBank,
        //     `${this.id}-diesel`,
        //     {
        //       amount: formData.voucherData.dieselExpenseAmount,
        //       date: new Date(),
        //       recievingId: this.id,
        //     },
        //     moment(new Date()).format('MMYYYY')
        //   );}
        //   if(formData.voucherData.labourExpenseBank){
        //   await this.receivingsService.addAccountExpense(
        //     formData.voucherData.labourExpenseBank,
        //     `${this.id}-labour`,
        //     {
        //       amount: formData.voucherData.labourExpenseAmount,
        //       date: new Date(),
        //       recievingId: this.id,
        //     },
        //     moment(new Date()).format('MMYYYY')
        //   );}
        //   if(formData.voucherData.khurakiExpenseBank){
        //   await this.receivingsService.addAccountExpense(
        //     formData.voucherData.khurakiExpenseBank,
        //     `${this.id}-khuraki`,
        //     {
        //       amount: formData.voucherData.khurakiExpenseAmount,
        //       date: new Date(),
        //       recievingId: this.id,
        //     },
        //     moment(new Date()).format('MMYYYY')
        //   );
        // }
        // if(formData.voucherData.freightExpenseBank){
        //   await this.receivingsService.addAccountExpense(
        //     formData.voucherData.freightExpenseBank,
        //     `${this.id}-freight`,
        //     {
        //       amount: formData.voucherData.freightExpenseAmount,
        //       date: new Date(),
        //       recievingId: this.id,
        //     },
        //     moment(new Date()).format('MMYYYY')
        //   );
        // }
        // if(formData.voucherData.tollExpenseBank){
        //   await this.receivingsService.addAccountExpense(
        //     formData.voucherData.tollExpenseBank,
        //     `${this.id}-toll`,
        //     {
        //       amount: formData.voucherData.tollExpenseAmount,
        //       date: new Date(),
        //       recievingId: this.id,
        //     },
        //     moment(new Date()).format('MMYYYY')
        //   );
        // }
        // if(formData.voucherData.repairExpenseBank){
        //   await this.receivingsService.addAccountExpense(
        //     formData.voucherData.repairExpenseBank,
        //     `${this.id}-repair`,
        //     {
        //       amount: formData.voucherData.repairExpenseAmount,
        //       date: new Date(),
        //       recievingId: this.id,
        //     },
        //     moment(new Date()).format('MMYYYY')
        //   );}

        //   if(formData.voucherData.otherExpenseBank){
        //   await this.receivingsService.addAccountExpense(
        //     formData.voucherData.otherExpenseBank,
        //     `${this.id}-other`,
        //     {
        //       amount: formData.voucherData.otherExpenseAmount,
        //       date: new Date(),
        //       recievingId: this.id,
        //     },
        //     moment(new Date()).format('MMYYYY')
        //   );
        // }
        this.isDone = true;
      } else {
        this.notification.showSuccess(this.config.messages.savedSuccessfully);
      }
      this.loader.dismiss();
    }
  }

  dismissModal = async () => {
    this.isDone = false;
    return true;
  };
}
