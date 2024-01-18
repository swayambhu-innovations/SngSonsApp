import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { ImportExportService } from 'src/app/main/settings/component/import-export/import-export.service';
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
  tableData = [
    { name: 'Shipment ID', key: 'ShipmentNumber', size: '4' },
    { name: 'Party Name', key: 'CustomerName', size: '3' },
    { name: 'Area', key: 'WSTown', size: '3' }
  ];

  constructor(
    public excelUploadService: ExcelUploadService,
    private importExportService: ImportExportService,
    private notification: NotificationService,
    private loadingController: LoadingController
  ) { }

  async ngOnInit() {
    this.loader = await this.loadingController.create({ message: Config.messages.pleaseWait })
    await this.init()
  }

  async init() {
    this.loader.present();
    (await this.importExportService.getAllVehicles()).docs.map((vehicle: any) => {
      this.vehicles[vehicle.id] = { ...vehicle.data(), id: vehicle.id };
      return { ...vehicle.data(), id: vehicle.id }
    });
    (await this.importExportService.getAllVendors()).docs.map((vendor: any) => {
      this.vendors[vendor.data().WSName.split(' ').join('-').toLowerCase()] = { ...vendor.data(), id: vendor.id };
      return { ...vendor.data(), id: vendor.id }
    });
    this.loader.dismiss();
  }

  addZSD(event: any, data: any, formatDate: any, scope: any) {
    data = scope.importExportService.formatShipment(data, formatDate);
    scope.importExportService.addShipments(data, scope, scope.loader, scope.notification);
    event.target.value = "";
  }
}
