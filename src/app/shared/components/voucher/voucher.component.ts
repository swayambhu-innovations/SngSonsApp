import { DatePipe } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { ShipmentsService } from 'src/app/main/home/tabs/shipments/shipments.service';
import { ShipmentStatus } from "src/app/utils/enum";
import { VoucherService } from './voucher.service';
import { uniq } from 'lodash';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent implements OnChanges {
  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private shipmentsService: ShipmentsService,
    private voucherService: VoucherService
  ) {
    console.log(this.data)
  }

  @Input() heading = '';
  @Input() search = '';
  @Input() tableData: any[] = [];
  @Input() data: any[] = [];
  @Input() showCal: boolean = true;

  showAll = false;
  loader: any;
  shipmentsData: any[] = [];
  shipmentStatus = ShipmentStatus;
  vendorData: any = {};

  async ionViewDidEnter() {
    if (this.data.length == 0) {
      this.getShipments();
    } else {
      this.shipmentsData = this.data;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']?.currentValue?.length != changes['data']?.previousValue?.length) {
      this.shipmentsData = changes['data'].currentValue;
    }
    console.log(this.shipmentsData)
  }

  openShipmentDetail(shipment: any) {
    this.navCtrl.navigateForward(`main/shipment/${shipment.id}`, {
      state: { ...shipment },
    });
  }

  get dateText() {
    const dt = new DatePipe('en-US').transform(this.voucherService.selectedDate, 'dd MMM')
    return dt
  }

  onChange(e: any) {
    this.voucherService.selectedDate = new DatePipe('en-US').transform(e.target.value, 'YYYY-MM-dd');
    this.getShipments();
  }

  async getShipments() {
    if (!this.voucherService.selectedDate) {
      return;
    }
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();
    const shipmentData = await this.shipmentsService.getShipmentsByDate(this.voucherService.selectedDate);
    this.shipmentsData = [];
    shipmentData.docs.map(async (shipment: any) => {
      if (!this.vendorData[shipment.data().vendor]) {
        (await this.shipmentsService.getVendor(shipment.data().vendorData.map((item: any) => {
          return item.vendor;
        }))).docs.map((vendor: any) => {
          this.vendorData[vendor.id] = { ...vendor.data() }
        })
      }
      const vendors = shipment.data().vendorData.map((item: any) => {
        return this.vendorData[item.vendor];
      });
      const data = {
        ...shipment.data(),
        CustomerName: uniq(vendors.map((item: any) => {
          return item?.WSName;
        })).join(','),
        WSTown: uniq(vendors.map((item: any) => {
          return item?.WSTown;
        })).join(','),
        WSCode: uniq(vendors.map((item: any) => {
          return item?.WSCode;
        })).join(','),
        vendors,
        id: shipment.id
      };
      this.shipmentsData.push({ "_1": data[this.tableData[0].key], "_2": data[this.tableData[1].key], "_3": data[this.tableData[2].key], ...data });
    });
    this.loader.dismiss();
  }
}
