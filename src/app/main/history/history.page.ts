import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import * as moment from 'moment';
import { formatDate } from 'src/app/utils/date-util';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import { Config } from 'src/app/config';
import { uniq } from 'lodash';
import { ShipmentStatus } from 'src/app/utils/enum';
import { ShipmentDetailService } from '../shipment-detail/shipment-detail.service';
import { SharedService } from 'src/app/shared/shared.service';

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
  shipmentStatus = ShipmentStatus;

  tableData = [
    { name: 'Shipment ID', key: 'ShipmentNumber', size: '4' },
    { name: 'Party Name', key: 'CustomerName', size: '3' },
    { name: 'Area', key: 'WSTown', size: '3' },
  ];

  statsData = {
    kot: 0,
    vendors: 0,
    shipments: 0,
    total: 0,
  };

  constructor(
    private loadingController: LoadingController,
    private shipmentsService: ShipmentsService,
    private shipmentDetailServie: ShipmentDetailService,
    private sharedService: SharedService
  ) {
    this.sharedService.refresh.subscribe((db) => {
      if (db) {
        this.statsData.kot = 0;
        this.statsData.vendors = 0;
        this.statsData.shipments = 0;
        this.statsData.total = 0;
        this.getShipments();
      }
    });
  }

  ngOnInit() {
    this.statsData.kot = 0;
    this.statsData.vendors = 0;
    this.statsData.shipments = 0;
    this.statsData.total = 0;
    this.getShipments();
  }

  startDate(e: any) {
    this.date1 = moment(
      e.target.value ? new Date(e.target.value) : new Date()
    ).format('dd-MMM-YYYY');
    this.statsData.kot = 0;
    this.statsData.vendors = 0;
    this.statsData.shipments = 0;
    this.statsData.total = 0;
    this.getShipments();
  }

  endDate(e: any) {
    this.date2 = moment(
      e.target.value ? new Date(e.target.value) : new Date()
    ).format('dd-MMM-YYYY');
    this.statsData.kot = 0;
    this.statsData.vendors = 0;
    this.statsData.shipments = 0;
    this.statsData.total = 0;
    this.getShipments();
  }

  async getShipments() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();
    const shipmentData = await this.shipmentsService.getShipmentsByDate(
      this.date1,
      this.date2,
      [ShipmentStatus.Suspended, ShipmentStatus.Completed]
    );
    const sData: any[] = [];
    shipmentData.docs.map(async (shipment: any) => {
      const shipdata = { ...shipment.data(), id: shipment.id };
      if (shipdata.status === ShipmentStatus.Completed) {
        const dta = await this.shipmentDetailServie.formatShipment(shipdata);
        this.statsData.kot += dta.vendorDetails.kot;
        this.statsData.vendors += dta.vendorData.length;
        this.statsData.shipments += 1;
        this.statsData.total += dta.vendorDetails.totalInvoiceAmount;
      }
      if (!this.vendorData[shipment.data().vendor]) {
        try {
          (
            await this.shipmentsService.getVendor(
              shipment.data().vendorData.map((item: any) => {
                return item.vendor;
              })
            )
          ).docs.map((vendor: any) => {
            this.vendorData[vendor.id] = { ...vendor.data() };
          });
        } catch (e) {}
      }
      const vendors = shipment.data().vendorData.map((item: any) => {
        return this.vendorData[item.vendor];
      });
      const data: any = {
        ...shipment.data(),
        CustomerName: uniq(
          vendors.map((item: any) => {
            return item?.WSName;
          })
        ).join(','),
        WSTown: uniq(
          vendors.map((item: any) => {
            return item?.WSTown;
          })
        ).join(','),
        WSCode: uniq(
          vendors.map((item: any) => {
            return item?.WSCode;
          })
        ).join(','),
        vendors,
        id: shipment.id,
      };
      sData.push({
        _1: data[this.tableData[0].key],
        _2: data[this.tableData[1].key],
        _3: data[this.tableData[2].key],
        ...data,
      });
    });
    this.shipmentsData = sData;
    this.loader.dismiss();
  }
}
