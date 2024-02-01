import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import { Config } from 'src/app/config';
import { formatDate } from '../../utils/date-util';
import { NotificationService } from 'src/app/utils/notification';
import { ShipmentStatus } from 'src/app/utils/enum';
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
  vendorDetails: any = {
    GSTNo: [],
    WSCode: [],
    WSName: [],
    WSTown: [],
    panNo: [],
    phoneNO: [],
    postalCode: [],
    distance: [],
    kot: [],
  };
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private shipmentService: ShipmentsService,
    private loadingController: LoadingController,
    private notification: NotificationService,
    public homeService: HomeService
  ) {
  }

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.getShipmentDetails();
  }

  openFillVoucherPage() {
    this.navCtrl.navigateForward(`main/voucher/${this.id}`, {
      state: { id: this.id },
    });
  }

  goBack() {
    this.navCtrl.back();
  }

  get invoiceNumber() {
    if (!this.shipmentDetails?.vendorData) {
      return '';
    }
    return this.shipmentDetails.vendorData.map((item: any) => {
      return item.CustomInvoiceNo;
    }).join(', ');
  }

  get distance() {
    return this.vendorDetails.distance.reduce((acc: number, item: string) => {
      acc += parseInt(item);
      return acc;
    }, 0)
  }

  get kot() {
    return this.vendorDetails.kot.reduce((acc: number, item: string) => {
      acc += parseInt(item);
      return acc;
    }, 0)
  }

  async getShipmentDetails() {
    this.loader.present();
    await (await this.shipmentService.getShipmentsById(this.id)).docs.map(async (shipment: any) => {
      const shipmentData = { ...shipment.data(), id: shipment.id, vendor: [] };
      await (await this.shipmentService.getVendor(shipmentData.vendorData.map((i: any, idx: number) => { return i.vendor }))).docs.map((vendor: any) => {
        const vdata = vendor.data();
        shipmentData.vendor.push({ ...vdata, id: vendor.id });
        vdata.GSTNo && this.vendorDetails.GSTNo.push(vdata.GSTNo);
        vdata.WSCode && this.vendorDetails.WSCode.push(vdata.WSCode);
        vdata.WSName && this.vendorDetails.WSName.push(vdata.WSName);
        vdata.WSTown && this.vendorDetails.WSTown.push(vdata.WSTown);
        vdata.panNo && this.vendorDetails.panNo.push(vdata.panNo);
        vdata.phoneNO && this.vendorDetails.phoneNO.push(vdata.phoneNO);
        vdata.postalCode && this.vendorDetails.postalCode.push(vdata.postalCode);
        vdata.distance && this.vendorDetails.distance.push(vdata.distance);
      });
      await (await this.shipmentService.getVehicle(shipmentData.vehicle)).docs.map((vehicle: any) => {
        shipmentData.vehicle = { ...vehicle.data(), id: vehicle.id }
      });
      this.vendorDetails.kot = shipmentData.vendorData.map((item: any) => {
        return item.KOT;
      })
      this.shipmentDetails = shipmentData;
      console.log(this.shipmentDetails, this.vendorDetails)
    })
    this.loader.dismiss();
  }

  async suspend(confirmation: any) {
    if (confirmation) {
      this.loader.present();
      await this.shipmentService.updShipmentStatus(this.id, ShipmentStatus.Suspended);
      this.shipmentDetails.status = ShipmentStatus.Suspended;
      this.loader.dismiss();
      this.notification.showSuccess(this.config.messages.updatedSuccessfully);
    }
    this.showConfirm = false;
  }
}
