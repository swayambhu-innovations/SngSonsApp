import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { HomeService } from '../../home/home.service';
import { ExcelUploadService } from 'src/app/utils/excel-upload';
import { NotificationService } from 'src/app/utils/notification';
import { ImportExportService } from '../../settings/component/import-export/import-export.service';
import { Config } from 'src/app/config';
import { ShipmentsService } from '../../home/tabs/shipments/shipments.service';

@Component({
  selector: 'app-file-details',
  templateUrl: './file-details.page.html',
  styleUrls: ['./file-details.page.scss'],
})
export class FileDetailsPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private importExportService: ImportExportService,
    public excelUploadService: ExcelUploadService,
    private notification: NotificationService,
    private loadingController: LoadingController,
    public homeService: HomeService,
    private shipmentService: ShipmentsService
  ) {}

  loader: any;
  correctShipments: any;

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    if (history.state.ZSDdetail) {
      this.correctShipments = JSON.parse(history.state.ZSDdetail);
    }
    if (this.correctShipments.length == 0)
      this.notification.showError(Config.messages.noImport);
  }

  async addZSDinDB() {
    let scope = this;
    await scope.importExportService.addShipments(
      this.correctShipments,
      scope,
      scope.loader,
      scope.notification
    );
    scope.navCtrl.navigateForward('/main/home');
  }

  goBack() {
    this.navCtrl.back();
  }
}
