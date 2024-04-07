import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { ExcelUploadService } from 'src/app/utils/excel-upload';
import { NotificationService } from 'src/app/utils/notification';
import { HomeService } from '../home/home.service';
import { ShipmentsService } from '../home/tabs/shipments/shipments.service';
import { ImportExportService } from '../settings/component/import-export/import-export.service';

@Component({
  selector: 'app-import-zsd',
  templateUrl: './import-zsd.page.html',
  styleUrls: ['./import-zsd.page.scss'],
})
export class ImportZSDPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private importExportService: ImportExportService,
    public excelUploadService: ExcelUploadService,
    private notification: NotificationService,
    private loadingController: LoadingController,
    public homeService: HomeService,
    private shipmentService: ShipmentsService
  ) {}

  config = Config;
  loader: any;
  loader2: any;

  ngOnInit() {}

  async uploadExcel(e: any) {
    this.loader = await this.loadingController.create({
      message: Config.messages.uploadWait,
    });
    this.loader.present();
    this.excelUploadService.parseExcel(e, this.addZSD, this);
    this.loader.dismiss();
  }

  addZSD(event: any, data: any, formatDate: any, scope: any) {
    data = scope.importExportService.formatShipment(data, formatDate);
    scope.importExportService.addShipments(
      data,
      scope,
      scope.loader,
      scope.notification
    );
    event.target.value = '';
  }

  goBack() {
    this.navCtrl.back();
  }
}
