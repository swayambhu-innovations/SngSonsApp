import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../home.service';
import { ExcelUploadService } from 'src/app/utils/excel-upload';
import { ImportExportService } from 'src/app/main/settings/component/import-export/import-export.service';
import { NotificationService } from 'src/app/utils/notification';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { ReceivingsService } from './receivings.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss'],
})
export class VendorsComponent implements OnInit {
  isError: boolean = false;
  isData: boolean = false;
  loader: any;
  loader2: any;

  tableData = [
    { name: 'Receiving ID', key: 'id', size: '4' },
    { name: 'Vehicle', key: 'vehicleNo', size: '3' },
    { name: 'Supplier', key: 'supplierName', size: '3' },
  ];

  constructor(
    public excelUploadService: ExcelUploadService,
    private importExportService: ImportExportService,
    private notification: NotificationService,
    private loadingController: LoadingController,
    public homeService: HomeService,
    private navCtrl: NavController,
    private receivingService: ReceivingsService
  ) {}

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    await this.init();
  }

  async init() {
    this.loader.present();
    (await this.importExportService.getAllVehicles()).docs.map(
      (vehicle: any) => {
        this.receivingService.vehicles[vehicle.id] = {
          ...vehicle.data(),
          id: vehicle.id,
        };
        return { ...vehicle.data(), id: vehicle.id };
      }
    );
    (await this.importExportService.getAllVendors()).docs.map((vendor: any) => {
      this.receivingService.vendors[
        vendor.data().WSName.split(' ').join('-').toLowerCase()
      ] = { ...vendor.data(), id: vendor.id };
      return { ...vendor.data(), id: vendor.id };
    });
    this.loader.dismiss();
  }

  uploadZMM() {
    this.navCtrl.navigateForward('main/import-zmm');
  }
}
