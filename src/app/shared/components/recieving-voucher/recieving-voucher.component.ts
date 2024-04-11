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
import { uniq } from 'lodash';
import { SharedService } from '../../shared.service';
import { AutoUnsubscribe } from 'src/app/utils/autoUnsubscriber';
import { ReceivingVoucherService } from './reciving-voucher.service';

@AutoUnsubscribe
@Component({
  selector: 'app-recieving-voucher',
  templateUrl: './recieving-voucher.component.html',
  styleUrls: ['./recieving-voucher.component.scss'],
})
export class RecievingVoucherComponent implements OnChanges, OnInit {
  constructor(
    private navCtrl: NavController,
    private loadingController: LoadingController,
    private shipmentsService: ShipmentsService,
    private receivingVoucherService: ReceivingVoucherService,
    private sharedService: SharedService
  ) {
    this.sharedService.refresh.subscribe((db) => {
      if (db) {
        if (this.data.length == 0 && this.fetchDefault) {
          this.getAllRecievings();
        } else {
          this.recivingsData = this.data;
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
  recivingsData: any[] = [];
  filteredReceivings: any[] = [];
  shipmentStatus = ShipmentStatus;
  vendorData: any = {};

  async ionViewDidEnter() {
    if (this.fetchDefault) {
      this.getAllRecievings();
    } else {
      this.filteredReceivings = this.data;
    }
  }

  async ngOnInit() {
    if (this.fetchDefault) {
      this.getAllRecievings();
    } else {
      this.filteredReceivings = this.data;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']?.currentValue) {
      this.filteredReceivings = changes['data'].currentValue;
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
      this.receivingVoucherService.selectedDate,
      'dd MMM'
    );
    return dt;
  }

  async onChange(e: any) {
    this.receivingVoucherService.selectedDate = new DatePipe('en-US').transform(
      e.target.value ? e.target.value : new Date(),
      'YYYY-MM-dd'
    );
    this.loader = await this.loadingController.create({
      message: Config.messages.refresh,
    });
    this.loader.present();
    this.getAllRecievings();
    this.loader.dismiss();
  }

  async getAllRecievings() {
    if (!this.receivingVoucherService.selectedDate) {
      return;
    }
    const shipmentData = await this.shipmentsService.getShipmentsByDate(
      this.receivingVoucherService.selectedDate
    );
    this.recivingsData = [];
    shipmentData.docs.map(async (shipment: any) => {
      if (!this.vendorData[shipment.data().vendor]) {
        (
          await this.shipmentsService.getVendor(
            shipment.data().vendorData.map((item: any) => {
              return item.SoldToParty;
            })
          )
        ).docs.map((vendor: any) => {
          this.vendorData[vendor.id] = { ...vendor.data() };
        });
      }
      const vendors = shipment.data().vendorData.map((item: any) => {
        return this.vendorData[item.SoldToParty];
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
      this.recivingsData.push({
        _1: data[this.tableData[0].key],
        _2: data[this.tableData[1].key],
        _3: data[this.tableData[2].key],
        ...data,
      });
    });
    this.filteredReceivings = this.recivingsData;
  }

  searchShipments(e: any) {
    const searchValue = e.detail.value;
    if (searchValue && searchValue.trim() !== '') {
      this.filteredReceivings = (
        this.data.length == 0 && this.fetchDefault
          ? this.recivingsData
          : this.data
      ).filter(
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
    } else
      this.filteredReceivings =
        this.data.length == 0 && this.fetchDefault
          ? this.recivingsData
          : this.data;
  }
}
