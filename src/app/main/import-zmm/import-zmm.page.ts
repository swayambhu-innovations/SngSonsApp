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
  fileDetails: any[] = [];
  filteredRecievings: any[] = [];
  filteredFiles: any[] = [];
  recievingsData: any[] = [];
  fileCreationDate: any;
  shipmentStatus = ShipmentStatus;
  lastUploadedZMM={
    date:'',
    time:''
  }

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();
    this.getAllFiles();
    this.getAllRecievings();
    this.loader.dismiss();
  }

  async getAllFiles() {
    this.filteredFiles = [];
    await this.importExportService.getZMM().then((dataDB) => {
      if (dataDB)
        dataDB.docs.map((item: any) => this.fileDetails.push(item.data()));
    });
    if (this.fileDetails.length > 0) {
      this.fileDetails.sort((a: any, b: any) =>
        a['createdAt'] < b['createdAt']
          ? 1
          : b['createdAt'] < a['createdAt']
          ? -1
          : 0
      );

      this.fileDetails.map((file: any) => {
        this.fileCreationDate = new Date(
          parseInt(file?.createdAt)
        ).toDateString();

        this.filteredFiles = [
          ...this.filteredFiles,
          {
            createdAt: this.fileCreationDate,
            fileName: file?.fileName,
            user: file?.user,
            userImage: file?.userImage,
          },
        ];
      });
    }

    this.fileDetails = this.filteredFiles;
  }

  async getAllRecievings() {
    this.filteredRecievings = [];
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

    const lastZMM = this.recievingsData.reduce((latest, current) => {
      return new Date(current.createdAt) > new Date(latest.createdAt)
        ? current
        : latest;
    }, this.recievingsData[0]);

    this.getLastZMM(lastZMM.createdAt);

    this.recievingsData = this.filteredRecievings;
  }

  getLastZMM(lastZMM:any) {
    const dateObject = new Date(lastZMM);

    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();

    let hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

    const isPM = hours >= 12;
    const period = isPM ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours === 0 ? 12 : hours;

    const formattedDate = `${String(day).padStart(2, '0')}-${String(
      month
    ).padStart(2, '0')}-${year}`;
    const formattedTime = `${String(hours).padStart(2, '0')}:${String(
      minutes
    ).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${period}`;
   
    
    
    let lastUploadedZMMdate= formattedDate;
    let lastUploadedZMMtime=formattedTime

    this.lastUploadedZMM = {
      date: lastUploadedZMMdate,
      time: lastUploadedZMMtime
    };

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

  async addZMM(
    event: any,
    data: any,
    fileData: any,
    formatDate: any,
    scope: any
  ) {
    data = await scope.importExportService.formatRecieving(data, formatDate);
    event.target.value = '';
    if (data == false) {
      scope.notification.showError(Config.messages.zmmInvalid);
    } else if (data.length > 0)
      scope.navCtrl.navigateForward(['/main/import-zmm/file-details'], {
        state: {
          ZMMdetail: JSON.stringify(data),
          fileData: JSON.stringify(fileData),
        },
      });
    else scope.notification.showError(Config.messages.noImportZMM);
  }

  goBack() {
    this.navCtrl.back();
  }
}