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
import { AutoUnsubscribe } from 'src/app/utils/autoUnsubscriber';
import { FormControl, FormGroup } from '@angular/forms';

@AutoUnsubscribe
@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  constructor(
    private loadingController: LoadingController,
    private shipmentsService: ShipmentsService,
    private shipmentDetailServie: ShipmentDetailService,
    private sharedService: SharedService
  ) {
    this.sharedService.refresh.subscribe((data) => {
      if (data) {
        this.getShipments();
      }
    });
  }

  date1: string = moment(new Date()).startOf('month').format('DD MMM');
  date2: string = moment(new Date()).format('DD MMM');
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

  ngOnInit() {}

  dateRangeChange(
    dateRangeStart: HTMLInputElement,
    dateRangeEnd: HTMLInputElement
  ) {
    this.startDate(dateRangeStart.value);
    this.endDate(dateRangeEnd.value);
  }

  startDate(date: any) {
    this.date1 = moment(date ? new Date(date) : new Date()).format(
      'YYYY-MM-DD'
    );
  }

  endDate(date: any) {
    this.date2 = moment(date ? new Date(date) : new Date()).format(
      'YYYY-MM-DD'
    );
    this.getShipments();
  }

  async getShipments() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();
    this.statsData.kot = 0;
    this.statsData.vendors = 0;
    this.statsData.shipments = 0;
    this.statsData.total = 0;
    const shipmentData = await this.shipmentsService.getShipmentsByDateRange(
      this.date1,
      this.date2,
      [ShipmentStatus.Suspended, ShipmentStatus.Completed]
    );
    const sData: any[] = [];
    if (shipmentData?.docs[0]?.data()) {
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
    }
    this.shipmentsData = sData;
    this.loader.dismiss();
  }
}
