import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { ImportExportService } from '../../settings/component/import-export/import-export.service';
import { ExcelUploadService } from 'src/app/utils/excel-upload';
import { NotificationService } from 'src/app/utils/notification';
import { HomeService } from '../../home/home.service';
import { ShipmentsService } from '../../home/tabs/shipments/shipments.service';
import * as moment from 'moment';

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
  fileData: any;

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    if (history.state.ZMMdetail) {
      this.recievings = JSON.parse(history.state.ZMMdetail);
    }
    if (history.state.fileData) {
      this.fileData = JSON.parse(history.state.fileData);
    }

    if (this.recievings.length == 0) {
      this.notification.showError(Config.messages.noImportZMM);
      this.goBack();
    } else
      this.recievings.map((item: any) => {
        item.dispatchDateType = moment(new Date(item?.dispatchDate)).format(
          'DD MMM'
        );
        item.expDeliveryDateType = moment(
          new Date(item?.expDeliverDate)
        ).format('DD MMM');
        item.gateEntryDateType = moment(new Date(item?.gateEntryDate)).format(
          'DD MMM'
        );
      });
  }

  async addZMMinDB() {
    let scope = this;
    await scope.importExportService.addRecieving(
      this.recievings,
      this.fileData,
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
