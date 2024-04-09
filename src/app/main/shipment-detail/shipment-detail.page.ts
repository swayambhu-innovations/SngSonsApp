import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import { Config } from 'src/app/config';
import { formatDate } from '../../utils/date-util';
import { NotificationService } from 'src/app/utils/notification';
import { ShipmentStatus } from 'src/app/utils/enum';
import { ShipmentDetailService } from './shipment-detail.service';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-shipment-detail',
  templateUrl: './shipment-detail.page.html',
  styleUrls: ['./shipment-detail.page.scss'],
})
export class ShipmentDetailPage implements OnInit {
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
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private shipmentService: ShipmentsService,
    private loadingController: LoadingController,
    private notification: NotificationService,
    private shipmentDetailService: ShipmentDetailService,
    public homeService: HomeService
  ) {}

  async ionViewWillEnter() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getShipmentDetails();
  }

  async ngOnInit() {}

  async openFillVoucherPage() {
    if (!this.shipmentDetails.voucher) {
      this.loader.present();
      const voucherNo = await this.shipmentService.updVoucherNumber();
      await this.shipmentService.updVoucherNumberInShipment(this.id, voucherNo);
      this.loader.dismiss();
    }
    this.navCtrl.navigateForward(`main/voucher/${this.id}`, {
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
    const data = this.shipmentDetails?.voucherData;
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
      }
    );
    this.loader.dismiss();
  }

  async suspend(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      this.shipmentService.updShipmentStatus(this.id, ShipmentStatus.Suspended);
      this.shipmentDetails.status = ShipmentStatus.Suspended;
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
