import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { ImportExportService } from '../../settings/component/import-export/import-export.service';
import { ExcelUploadService } from 'src/app/utils/excel-upload';
import { NotificationService } from 'src/app/utils/notification';
import { HomeService } from '../../home/home.service';
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
  recievings: any;

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    if (history.state.ZMMdetail) {
      this.recievings = JSON.parse(history.state.ZMMdetail);
    }

    if (this.recievings.length == 0)
      this.notification.showError(Config.messages.noImportZMM);
  }

  async addZMMinDB() {
    let scope = this;
    await scope.importExportService.addRecieving(
      this.recievings,
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
