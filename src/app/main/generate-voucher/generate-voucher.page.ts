import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { formatDate, formatDateJS } from 'src/app/utils/date-util';
import { ShipmentStatus } from 'src/app/utils/enum';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import { NotificationService } from 'src/app/utils/notification';
import { ShipmentDetailService } from '../shipment-detail/shipment-detail.service';
import { HomeService } from '../home/home.service';
import { AccountExpenseService } from '../settings/component/account-expense/account-expense.service';
import { LabourMasterService } from '../settings/component/labour-master/labour-master.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilService } from 'src/app/utils/util';
import * as moment from 'moment';

@Component({
  selector: 'app-generate-voucher',
  templateUrl: './generate-voucher.page.html',
  styleUrls: ['./generate-voucher.page.scss'],
})
export class GenerateVoucherPage implements OnInit {
  isDone: boolean = false;
  id: any;
  isPDF: boolean = false;
  isExcel: boolean = false;
  loader: any;
  shipmentDetails: any = {};
  formatDate = formatDate;
  config = Config;
  showConfirm = false;
  shipmentStatus = ShipmentStatus;
  isSuspended = false;
  accounts: any[] = [];
  expense: any = {};
  expenseAccount: any = {};
  labours: any[] = [];

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private shipmentService: ShipmentsService,
    private loadingController: LoadingController,
    private notification: NotificationService,
    private shipmentDetailService: ShipmentDetailService,
    public homeService: HomeService,
    private accountExpenseService: AccountExpenseService,
    private labourMasterService: LabourMasterService,
    private utilService: UtilService
  ) {}

  voucherForm: FormGroup = new FormGroup({
    id: new FormControl('', [Validators.required]),
    dieselExpenseBank: new FormControl('', [Validators.required]),
    dieselExpenseAmount: new FormControl('', [Validators.required]),
    labour: new FormControl('', [Validators.required]),
    labourExpenseBank: new FormControl('', [Validators.required]),
    labourExpenseAmount: new FormControl('', [Validators.required]),
    khurakiExpenseBank: new FormControl('', [Validators.required]),
    khurakiExpenseAmount: new FormControl('', [Validators.required]),
    freightExpenseBank: new FormControl('', [Validators.required]),
    freightExpenseAmount: new FormControl('', [Validators.required]),
    tollExpenseBank: new FormControl('', [Validators.required]),
    tollExpenseAmount: new FormControl('', [Validators.required]),
    repairExpenseBank: new FormControl('', [Validators.required]),
    repairExpenseAmount: new FormControl('', [Validators.required]),
    otherExpenseBank: new FormControl('', [Validators.required]),
    otherExpenseAmount: new FormControl('', [Validators.required]),
    remark: new FormControl('', []),
    createdAt: new FormControl('', []),
    createdById: new FormControl('', []),
    createdByName: new FormControl('', []),
  });

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.id = this.route.snapshot.paramMap.get('id');
    await this.getExpense();
    await this.getAccounts();
    await this.getLabours();
    await this.getShipmentDetails();
  }

  goBack() {
    this.navCtrl.back();
  }

  get totalExpense() {
    const data = this.voucherForm.value;
    return (
      parseFloat(data.dieselExpenseAmount || 0) +
      parseFloat(data.labourExpenseAmount || 0) +
      parseFloat(data.khurakiExpenseAmount || 0) +
      parseFloat(data.freightExpenseAmount || 0) +
      parseFloat(data.tollExpenseAmount || 0) +
      parseFloat(data.repairExpenseAmount || 0) +
      parseFloat(data.otherExpenseAmount || 0)
    );
  }

  get createdAt() {
    const data = this.voucherForm.value;
    return formatDate(data.createdAt, 'dd MMM YYYY');
  }

  get createdByName() {
    const data = this.voucherForm.value;
    return data.createdByName;
  }

  async getShipmentDetails() {
    this.loader.present();
    (await this.shipmentService.getShipmentsById(this.id)).docs.map(
      async (shipment: any) => {
        const shipmentData = {
          ...shipment.data(),
          id: shipment.id,
          vendor: [],
        };
        this.shipmentDetails = await this.shipmentDetailService.formatShipment(
          shipmentData
        );
        if (this.shipmentDetails.voucherData) {
          this.voucherForm.patchValue(this.shipmentDetails.voucherData);
        } else {
          this.voucherForm.patchValue({
            id: this.id,
            createdAt: new Date(),
            createdById: this.utilService.getUserId(),
            createdByName: this.utilService.getUserName(),
            dieselExpenseBank: this.expense['Diesel'].account,
            labourExpenseBank: this.expense['Labour'].account,
            khurakiExpenseBank: this.expense['Khuraki'].account,
            freightExpenseBank: this.expense['Freight'].account,
            tollExpenseBank: this.expense['Toll'].account,
            repairExpenseBank: this.expense['Repair'].account,
            otherExpenseBank: this.expense['Others'].account,
          });
        }
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

  async getExpense() {
    (await this.accountExpenseService.getExpenseType()).docs.map(
      (item: any) => {
        const data = { ...item.data(), id: item.id };
        if (data.active) {
          this.expense[data.expenseName] = data;
          this.expenseAccount[data.account] = data;
        }
      }
    );
  }

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
      formData.voucherData[amount] < expense.minDispense ||
      formData.voucherData[amount] > expense.maxDispense
    ) {
      this.notification.showError(
        `${Config.messages.invalidAmount}for ${key} Expense`
      );
      return false;
    }
    return true;
  }
  async addVoucher(stat: string) {
    if (!this.voucherForm.valid) {
      this.voucherForm.markAllAsTouched();
      this.notification.showError(this.config.messages.fillAllExpenses);
      return;
    }
    const formData: any = { voucherData: this.voucherForm.value };

    if (
      !this.checkValidAmount(
        formData,
        'dieselExpenseBank',
        'dieselExpenseAmount',
        'Diesel'
      ) ||
      !this.checkValidAmount(
        formData,
        'labourExpenseBank',
        'labourExpenseAmount',
        'Labour'
      ) ||
      !this.checkValidAmount(
        formData,
        'khurakiExpenseBank',
        'khurakiExpenseAmount',
        'Khuraki'
      ) ||
      !this.checkValidAmount(
        formData,
        'freightExpenseBank',
        'freightExpenseAmount',
        'Freight'
      ) ||
      !this.checkValidAmount(
        formData,
        'tollExpenseBank',
        'tollExpenseAmount',
        'Toll'
      ) ||
      !this.checkValidAmount(
        formData,
        'repairExpenseBank',
        'repairExpenseAmount',
        'Repair'
      ) ||
      !this.checkValidAmount(
        formData,
        'otherExpenseBank',
        'otherExpenseAmount',
        'Other'
      )
    ) {
      return;
    }

    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();
    if (stat === 'Submit') {
      formData['status'] = ShipmentStatus.PendingPostDelivery;
    }
    await this.shipmentService.updShipmentVoucher(this.id, formData);
    if (stat === 'Submit') {
      await this.shipmentService.addAccountExpense(
        formData.voucherData.dieselExpenseBank,
        `${this.id}-diesel`,
        {
          amount: formData.voucherData.dieselExpenseAmount,
          date: new Date(),
          shipmentId: this.id,
        },
        moment(new Date()).format('MMYYYY')
      );
      await this.shipmentService.addAccountExpense(
        formData.voucherData.labourExpenseBank,
        `${this.id}-labour`,
        {
          amount: formData.voucherData.labourExpenseAmount,
          date: new Date(),
          shipmentId: this.id,
        },
        moment(new Date()).format('MMYYYY')
      );
      await this.shipmentService.addAccountExpense(
        formData.voucherData.khurakiExpenseBank,
        `${this.id}-khuraki`,
        {
          amount: formData.voucherData.khurakiExpenseAmount,
          date: new Date(),
          shipmentId: this.id,
        },
        moment(new Date()).format('MMYYYY')
      );
      await this.shipmentService.addAccountExpense(
        formData.voucherData.freightExpenseBank,
        `${this.id}-freight`,
        {
          amount: formData.voucherData.freightExpenseAmount,
          date: new Date(),
          shipmentId: this.id,
        },
        moment(new Date()).format('MMYYYY')
      );
      await this.shipmentService.addAccountExpense(
        formData.voucherData.tollExpenseBank,
        `${this.id}-toll`,
        {
          amount: formData.voucherData.tollExpenseAmount,
          date: new Date(),
          shipmentId: this.id,
        },
        moment(new Date()).format('MMYYYY')
      );
      await this.shipmentService.addAccountExpense(
        formData.voucherData.repairExpenseBank,
        `${this.id}-repair`,
        {
          amount: formData.voucherData.repairExpenseAmount,
          date: new Date(),
          shipmentId: this.id,
        },
        moment(new Date()).format('MMYYYY')
      );
      await this.shipmentService.addAccountExpense(
        formData.voucherData.otherExpenseBank,
        `${this.id}-other`,
        {
          amount: formData.voucherData.otherExpenseAmount,
          date: new Date(),
          shipmentId: this.id,
        },
        moment(new Date()).format('MMYYYY')
      );
      this.isDone = true;
    } else {
      this.notification.showSuccess(this.config.messages.savedSuccessfully);
    }
    this.loader.dismiss();
  }

  dismissModal = async () => {
    this.isDone = false;
    return true;
  };
}
