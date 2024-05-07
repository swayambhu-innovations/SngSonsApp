import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { NotificationService } from './notification';
import { isEmpty } from 'lodash';
import { UtilService } from './util';

@Injectable({
  providedIn: 'root',
})
export class ExcelUploadService {
  constructor(
    private notification: NotificationService,
    private util: UtilService
  ) {}
  userName: string = '';
  displayImage: string = '';

  convertToDate = (serial: any) => {
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);

    var fractional_day = serial - Math.floor(serial) + 0.0000001;

    var total_seconds = Math.floor(86400 * fractional_day);

    var seconds = total_seconds % 60;

    total_seconds -= seconds;

    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(
      date_info.getFullYear(),
      date_info.getMonth(),
      date_info.getDate(),
      hours,
      minutes,
      seconds
    );
  };

  getUserName() {
    const data: any = this.util.getUserdata();
    this.userName = data?.access?.userName || '';
  }

  parseExcel(event: any, callback: any, scope: any) {
    /* wire up file reader */
    let retData: any = [];
    const target: DataTransfer = <DataTransfer>event.target;
    if (target.files.length > 1) {
      this.notification.showError('Cannot use multiple files');
      event.target.value = '';
    } else {
      var file = target.files[0];
      var filename = file.name;
      this.getUserName();
      this.displayImage = this.util.getUserPhoto();

      const lastModified = new Date(file.lastModified);
      

      const fileDetail = {
        fileName: filename,
        createdAt: new Date().getTime(),
        lastModified:lastModified.getTime(),
        user: this.userName,
        userImage: this.displayImage,
      };

      const reader: FileReader = new FileReader();
      reader.readAsArrayBuffer(target.files[0]);
      reader.onload = (e: any) => {
        /* create workbook */
        const binarystr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

        /* selected the first sheet */
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        /* save data */
        retData = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
        callback(event, retData, fileDetail, this.convertToDate, scope);
      };
    }
  }
}
