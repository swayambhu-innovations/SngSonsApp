import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import { Config } from 'src/app/config';
import { formatDate } from '../../utils/date-util';
import { NotificationService } from 'src/app/utils/notification';
import { ShipmentStatus } from 'src/app/utils/enum';
import { HomeService } from '../home/home.service';
import { ShipmentDetailService } from '../shipment-detail/shipment-detail.service';

@Component({
  selector: 'app-post-delivery',
  templateUrl: './post-delivery.page.html',
  styleUrls: ['./post-delivery.page.scss'],
})
export class PostDeliveryPage implements OnInit {
  id: any;
  isPDF: boolean = false;
  isExcel: boolean = false;
  loader: any;
  shipmentDetails: any = {};
  formatDate = formatDate;
  config = Config;
  showConfirm = false;
  shipmentStatus = ShipmentStatus;
  isCompleted: boolean = false;
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private shipmentService: ShipmentsService,
    private loadingController: LoadingController,
    private notification: NotificationService,
    private shipmentDetailService: ShipmentDetailService,
    public homeService: HomeService
  ) {}

  invoiceSrc: any =
    'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';
  MLRAcknSrc: any =
    'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';

    async ionViewWillEnter() {
      this.loader = await this.loadingController.create({
        message: Config.messages.pleaseWait,
      });
      this.id = this.route.snapshot.paramMap.get('id');
      this.getShipmentDetails();
    }
  
    async ngOnInit() {
      
    }

  goBack() {
    this.navCtrl.back();
  }

  uploadInvoice(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.invoiceSrc = reader.result;
    };
  }

  removeInv() {
    this.invoiceSrc =
      'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';
  }

  uploadAckn(e: any) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.MLRAcknSrc = reader.result;
    };
  }

  removeMLR() {
    this.MLRAcknSrc =
      'https://ik.imagekit.io/xji6otwwkb/default-image.jpg?updatedAt=1680849653455';
  }

  get totalExpense() {
    const data = this.shipmentDetails?.voucherData;
    if (!data) {
      return 0;
    }
    return parseFloat(data.dieselExpenseAmount || 0) + parseFloat(data.labourExpenseAmount || 0) + parseFloat(data.khurakiExpenseAmount || 0) + parseFloat(data.freightExpenseAmount || 0) + parseFloat(data.tollExpenseAmount || 0) + parseFloat(data.repairExpenseAmount || 0) + parseFloat(data.otherExpenseAmount || 0);
  }

  async getShipmentDetails() {
    this.loader.present();
    await (await this.shipmentService.getShipmentsById(this.id)).docs.map(async (shipment: any) => {
      const shipmentData = { ...shipment.data(), id: shipment.id, vendor: [] };
      this.shipmentDetails = await this.shipmentDetailService.formatShipment(shipmentData);
      console.log(this.shipmentDetails)
    })
    this.loader.dismiss();
  }
}
