import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { ShipmentStatus } from 'src/app/utils/enum';
import { ImportExportService } from '../settings/component/import-export/import-export.service';
import { ExcelUploadService } from 'src/app/utils/excel-upload';
import { NotificationService } from 'src/app/utils/notification';
import { HomeService } from '../home/home.service';

@Component({
  selector: 'app-import-zmm',
  templateUrl: './import-zmm.page.html',
  styleUrls: ['./import-zmm.page.scss'],
})
export class ImportZmmPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private importExportService: ImportExportService,
    public excelUploadService: ExcelUploadService,
    private loadingController: LoadingController,
    private notification: NotificationService,
    public homeService: HomeService
  ) {}

  config = Config;
  loader: any;
  loader2: any;
  tableData: any[] = [];
  filteredShipments: any[] = [];
  shipmentsData: any[] = [];
  shipmentStatus = ShipmentStatus;

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();
    this.getShipments();
    this.loader.dismiss();
  }

  async getShipments() {
    await this.importExportService.getShipments().then((dataDB) => {
      if (dataDB)
        dataDB.docs.map((item: any) => this.shipmentsData.push(item.data()));
    });
    if (this.shipmentsData.length > 0)
      this.shipmentsData.sort((a: any, b: any) =>
        a?.vendorData[0]['CustomInvoiceNo'] <
        b?.vendorData[0]['CustomInvoiceNo']
          ? 1
          : b?.vendorData[0]['CustomInvoiceNo'] <
            a?.vendorData[0]['CustomInvoiceNo']
          ? -1
          : 0
      );
    this.filteredShipments = this.shipmentsData;
  }

  searchShipments(e: any) {
    const searchValue = e.detail.value;
    if (searchValue && searchValue.trim() !== '') {
      this.filteredShipments = this.shipmentsData.filter(
        (shipment: any) =>
          shipment.vendorData[0]['CustomInvoiceNo']
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          shipment.vendorData[0]['CustomerName']
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      );
    } else this.filteredShipments = this.shipmentsData;
  }

  async uploadExcel(e: any) {
    this.loader = await this.loadingController.create({
      message: Config.messages.uploadWait,
    });
    this.loader.present();
    this.excelUploadService.parseExcel(e, this.addZMM, this);
    this.loader.dismiss();
  }

  async addZMM(event: any, data: any, formatDate: any, scope: any) {
    // event.target.value = '';
    // if (data.length > 0)
    //   scope.navCtrl.navigateForward(['/main/import-zmm/file-details'], {
    //     state: { ZSDdetail: JSON.stringify(data) },
    //   });
    // else scope.notification.showError(Config.messages.noImport);
    console.log(data);
    data = await scope.importExportService.formatRecieving(data, formatDate);
    console.log(data);
  }

  goBack() {
    this.navCtrl.back();
  }
}
