import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { formatDate } from 'src/app/utils/date-util';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import { Config } from 'src/app/config';
import { uniq } from 'lodash';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  date1: string = moment(new Date()).startOf('month').format('YYYY-MM-DD');
  date2: string = moment(new Date()).format('YYYY-MM-DD');
  formatDate = formatDate;
  loader: any;
  shipmentsData: any[] = [];
  vendorData: any = {};

  tableData = [
    { name: 'Shipment ID', key: 'ShipmentNumber', size: '4' },
    { name: 'Party Name', key: 'CustomerName', size: '3' },
    { name: 'Area', key: 'WSTown', size: '3' }
  ];

  constructor(
    private loadingController: LoadingController,
    private shipmentsService: ShipmentsService,
  ) {}

  ngOnInit() {
    this.getShipments();
  }

  startDate(e: any) {
    this.date1 = moment(e.target.value).format('YYYY-MM-DD');
    this.getShipments();
  }

  endDate(e: any) {
    this.date2 = moment(e.target.value).format('YYYY-MM-DD');
    this.getShipments();
  }

  async getShipments() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();
    const shipmentData = await this.shipmentsService.getShipmentsByDate(this.date1, this.date2);
    const sData: any[] = [];
    await shipmentData.docs.map(async (shipment: any) => {
      if (!this.vendorData[shipment.data().vendor]) {
        try {
          (await this.shipmentsService.getVendor(shipment.data().vendorData.map((item: any) => {
            return item.vendor;
          }))).docs.map((vendor: any) => {
            this.vendorData[vendor.id] = { ...vendor.data() }
          })
        } catch(e) {}
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
      sData.push({ "_1": data[this.tableData[0].key], "_2": data[this.tableData[1].key], "_3": data[this.tableData[2].key], ...data });
    });
    this.shipmentsData = sData;
    this.loader.dismiss();
  }
}
