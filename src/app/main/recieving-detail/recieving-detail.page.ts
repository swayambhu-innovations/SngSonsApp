import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { formatDate } from 'src/app/utils/date-util';
import { RecievingStatus } from 'src/app/utils/enum';
import { NotificationService } from 'src/app/utils/notification';
import { HomeService } from '../home/home.service';
import { ReceivingsService } from '../home/tabs/vendors/receivings.service';
import { RecievingDetailService } from './recieving-detail.service';

@Component({
  selector: 'app-recieving-detail',
  templateUrl: './recieving-detail.page.html',
  styleUrls: ['./recieving-detail.page.scss'],
})
export class RecievingDetailPage implements OnInit {
  id: any;
  isPDF: boolean = false;
  isExcel: boolean = false;
  loader: any;
  recievingDetails: any = {};
  formatDate = formatDate;
  config = Config;
  showConfirm = false;
  recievingStatus = RecievingStatus;
  isSuspended = false;
  dispatchDate: any;
  expDeliveryDate: any;
  gateEntryDate: any;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private recievingsService: ReceivingsService,
    private loadingController: LoadingController,
    private notification: NotificationService,
    private recievingDetailService: RecievingDetailService,
    public homeService: HomeService
  ) {}

  async ionViewWillEnter() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getRecievingDetails();
  }

  async ngOnInit() {}

  async openFillVoucherPage() {
    if (!this.recievingDetails.voucher) {
      this.loader.present();
      const voucherNo = await this.recievingsService.updVoucherNumber();
      await this.recievingsService.updVoucherNumberInRecieving(
        this.id,
        voucherNo
      );
      this.loader.dismiss();
    }
    this.navCtrl.navigateForward(`main/zmm-voucher/${this.id}`, {
      state: { id: this.id },
    });
  }

  openFillDeliveryPage() {
    this.navCtrl.navigateForward(`main/voucher/post-delivery/${this.id}`, {
      state: { id: this.id },
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  openExcel() {
    this.isExcel = true;
  }

  get totalExpense() {
    const data = this.recievingDetails?.voucherData;
    if (!data) {
      return 0;
    }
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
      }
    );

    this.loader.dismiss();
  }

  async suspend(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      this.recievingsService.updRecievingStatus(
        this.id,
        RecievingStatus.Suspended
      );
      this.recievingDetails.status = RecievingStatus.Suspended;
      this.loader.dismiss();
      this.notification.showSuccess(this.config.messages.updatedSuccessfully);
    }
    this.isSuspended = false;
  }

  dismissModal = async () => {
    this.isSuspended = false;
    return true;
  };
}
