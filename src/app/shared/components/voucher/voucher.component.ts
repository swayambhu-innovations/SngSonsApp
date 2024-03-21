import { DatePipe } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { ShipmentsService } from 'src/app/main/home/tabs/shipments/shipments.service';
import { ShipmentStatus } from 'src/app/utils/enum';
import { VoucherService } from './voucher.service';
import { uniq } from 'lodash';
import { SharedService } from '../../shared.service';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
})
export class VoucherComponent implements OnChanges, OnInit {
  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private shipmentsService: ShipmentsService,
    private voucherService: VoucherService,
    private sharedService: SharedService
  ) {
    this.sharedService.refresh.subscribe((db) => {
      if (db) {
        if (this.data.length == 0 && this.fetchDefault) {
          this.getShipments();
        } else {
          this.shipmentsData = this.data;
        }
      }
    });
  }

  @Input() heading = '';
  @Input() search = '';
  @Input() tableData: any[] = [];
  @Input() data: any[] = [];
  @Input() showCal: boolean = true;
  @Input() fetchDefault = true;

  showAll = false;
  count: number = 5;
  loader: any;
  shipmentsData: any[] = [];
  filteredShipments: any[] = [];
  shipmentStatus = ShipmentStatus;
  vendorData: any = {};

  async ionViewDidEnter() {
    if (this.data.length == 0 && this.fetchDefault) {
      this.getShipments();
    } else {
      this.filteredShipments = this.data;
    }
  }

  async ngOnInit() {
    if (this.data.length == 0 && this.fetchDefault) {
      this.getShipments();
    } else {
      this.filteredShipments = this.data;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']?.currentValue) {
      this.filteredShipments = changes['data'].currentValue;
    }
  }

  openShipmentDetail(shipment: any) {
    this.navCtrl.navigateForward(`main/shipment/${shipment.id}`, {
      state: { ...shipment },
    });
  }

  showMoreShipments() {
    this.count += 5;
  }

  get dateText() {
    const dt = new DatePipe('en-US').transform(
      this.voucherService.selectedDate,
      'dd MMM'
    );
    return dt;
  }

  onChange(e: any) {
    this.voucherService.selectedDate = new DatePipe('en-US').transform(
      e.target.value ? e.target.value : new Date(),
      'YYYY-MM-dd'
    );
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
    const shipmentData = await this.shipmentsService.getShipmentsByDate(
      this.voucherService.selectedDate
    );
    shipmentData.docs.map((shipment: any) => {});
    this.shipmentsData = [];
    shipmentData.docs.map(async (shipment: any) => {
      if (!this.vendorData[shipment.data().vendor]) {
        (
          await this.shipmentsService.getVendor(
            shipment.data().vendorData.map((item: any) => {
              return item.vendor;
            })
          )
        ).docs.map((vendor: any) => {
          this.vendorData[vendor.id] = { ...vendor.data() };
        });
      }
      const vendors = shipment.data().vendorData.map((item: any) => {
        return this.vendorData[item.vendor];
      });
      const data = {
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
      this.shipmentsData.push({
        _1: data[this.tableData[0].key],
        _2: data[this.tableData[1].key],
        _3: data[this.tableData[2].key],
        ...data,
      });
    });
    this.filteredShipments = this.shipmentsData;
    this.loader.dismiss();
  }

  searchShipments(e: any) {
    const searchValue = e.detail.value;
    if (searchValue && searchValue.trim() !== '') {
      this.filteredShipments = this.shipmentsData.filter(
        (shipment: any) =>
          shipment.CustomerName.toLowerCase().includes(
            searchValue.toLowerCase()
          ) ||
          shipment.ShipmentNumber.toLowerCase().includes(
            searchValue.toLowerCase()
          ) ||
          shipment.TransporterName.toLowerCase().includes(
            searchValue.toLowerCase()
          ) ||
          shipment.Ownership.toLowerCase().includes(
            searchValue.toLowerCase()
          ) ||
          shipment.WSCode.toLowerCase().includes(searchValue.toLowerCase()) ||
          shipment.WSTown.toLowerCase().includes(searchValue.toLowerCase()) ||
          shipment.status.toLowerCase().includes(searchValue.toLowerCase()) ||
          shipment.vehicle.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else this.filteredShipments = this.shipmentsData;
  }
}
