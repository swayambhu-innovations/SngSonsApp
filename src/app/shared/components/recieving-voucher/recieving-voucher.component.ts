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
import { RecievingStatus, ShipmentStatus } from 'src/app/utils/enum';
import { uniq } from 'lodash';
import { SharedService } from '../../shared.service';
import { AutoUnsubscribe } from 'src/app/utils/autoUnsubscriber';
import { ReceivingVoucherService } from './reciving-voucher.service';
import { ReceivingsService } from 'src/app/main/home/tabs/vendors/receivings.service';

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
    private receivingVoucherService: ReceivingVoucherService,
    private sharedService: SharedService,
    private receivingService: ReceivingsService
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
  recievingStatus = RecievingStatus;
  supplierData: any = {};

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

  openRecievingDetail(receiving: any) {
    this.navCtrl.navigateForward(`main/recieving/${receiving.id}`, {
      state: { ...receiving },
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
    const recievingData = await this.receivingService.getReceivingsByDate(
      this.receivingVoucherService.selectedDate
    );
    this.recivingsData = [];

    recievingData.docs.map(async (receiving: any) => {
      const suppliers = receiving.data().supplierData.map((item: any) => {
        return item;
      });

      const data = {
        ...receiving.data(),
        id: receiving.id,
        supplierName: uniq(
          suppliers.map((item: any) => {
            return item?.supplierName;
          })
        ).join(', '),
        suppliers,
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
        (receiving: any) =>
          receiving.SupplierName.toLowerCase().includes(
            searchValue.toLowerCase()
          ) ||
          receiving.ShipmentNumber.toLowerCase().includes(
            searchValue.toLowerCase()
          ) ||
          receiving.TransporterName.toLowerCase().includes(
            searchValue.toLowerCase()
          ) ||
          receiving.Ownership.toLowerCase().includes(
            searchValue.toLowerCase()
          ) ||
          receiving.WSCode.toLowerCase().includes(searchValue.toLowerCase()) ||
          receiving.WSTown.toLowerCase().includes(searchValue.toLowerCase()) ||
          receiving.status.toLowerCase().includes(searchValue.toLowerCase()) ||
          receiving.vehicle.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else
      this.filteredReceivings =
        this.data.length == 0 && this.fetchDefault
          ? this.recivingsData
          : this.data;
  }
}
