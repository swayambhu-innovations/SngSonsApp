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
  filteredRecievings: any[] = [];
  recievingsData: any[] = [];
  shipmentStatus = ShipmentStatus;

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();
    this.getAllRecievings();
    this.loader.dismiss();
  }

  async getAllRecievings() {
    await this.importExportService.getRecievings().then((dataDB) => {
      if (dataDB)
        dataDB.docs.map((item: any) => this.recievingsData.push(item.data()));
    });
    if (this.recievingsData.length > 0) {
      this.recievingsData.sort((a: any, b: any) =>
        a['expDeliverDate'] < b['expDeliverDate']
          ? 1
          : b['expDeliverDate'] < a['expDeliverDate']
          ? -1
          : 0
      );

      this.recievingsData.map((recieving: any) => {
        recieving.supplierData.map((supplier: any) => {
          this.filteredRecievings = [
            ...this.filteredRecievings,
            {
              vehicleNo: recieving.vehicleNo,
              gateEntryNo: recieving.gateEntryNo,
              supplierName: supplier.supplierName,
            },
          ];
        });
      });
    }

    this.recievingsData = this.filteredRecievings;
  }

  searchRecievings(e: any) {
    const searchValue = e.detail.value;
    if (searchValue && searchValue.trim() !== '') {
      this.filteredRecievings = this.recievingsData.filter(
        (recievings: any) =>
          recievings['gateEntryNo']
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          recievings['transporterName']
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          recievings['recPlantDesc']
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          recievings['vehicleNo']
            .toLowerCase()
            .includes(searchValue.toLowerCase()) ||
          recievings.supplierData[0]['supplierName']
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      );
    } else this.filteredRecievings = this.recievingsData;
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
    data = await scope.importExportService.formatRecieving(data, formatDate);
    event.target.value = '';
    console.log(data);
    if (data)
      scope.navCtrl.navigateForward(['/main/import-zmm/file-details'], {
        state: { ZMMdetail: JSON.stringify(data) },
      });
    else scope.notification.showError(Config.messages.noImportZMM);
  }

  goBack() {
    this.navCtrl.back();
  }
}
