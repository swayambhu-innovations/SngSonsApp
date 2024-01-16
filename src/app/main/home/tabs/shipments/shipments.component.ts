import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { ShipmentsService } from 'src/app/main/settings/component/import-export/shipments.service';
import { ExcelUploadService } from 'src/app/utils/excel-upload';
import { NotificationService } from 'src/app/utils/notification';
import { read, utils } from 'xlsx';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss'],
})
export class ShipmentsComponent implements OnInit {
  isError: boolean = false;
  isData: boolean = false;
  loader: any;
  vehicles: any = {};
  vendors: any = {};

  @ViewChild('uploadZSD') uploadZSD: ElementRef | undefined;

  constructor(
    public excelUploadService: ExcelUploadService,
    private shipmentsService: ShipmentsService,
    private notification: NotificationService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.loader = await this.loadingController.create({ message: Config.messages.pleaseWait })
    await this.init()
  }

  async init() {
    this.loader.present();
    (await this.shipmentsService.getAllVehicles()).docs.map((vehicle: any) => {
      this.vehicles[vehicle.id] = { ...vehicle.data(), id: vehicle.id };
      return { ...vehicle.data(), id: vehicle.id }
    });
    (await this.shipmentsService.getAllVendors()).docs.map((vendor: any) => {
      this.vendors[vendor.data().WSName.split(' ').join('-').toLowerCase()] = { ...vendor.data(), id: vendor.id };
      return { ...vendor.data(), id: vendor.id }
    });
    this.loader.dismiss();
  }

  addZSD(event: any, data: any, formatDate: any, scope: any) {
    data = scope.shipmentsService.formatShipment(data, formatDate);
    scope.shipmentsService.addShipments(data, scope, scope.loader, scope.notification);
    event.target.value = "";
  }
}
