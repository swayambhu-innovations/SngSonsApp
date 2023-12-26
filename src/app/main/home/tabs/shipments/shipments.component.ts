import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { BarGraphTableComponent } from 'src/app/shared/components/bar-graph-table/bar-graph-table.component';
import { DayWiseSummaryComponent } from 'src/app/shared/components/day-wise-summary/day-wise-summary.component';
import { VoucherComponent } from 'src/app/shared/components/voucher/voucher.component';
import { read, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-shipments',
  templateUrl: './shipments.component.html',
  styleUrls: ['./shipments.component.scss'],
  imports: [
    DayWiseSummaryComponent,
    VoucherComponent,
    BarGraphTableComponent,
    IonicModule,
  ],
  standalone: true,
})
export class ShipmentsComponent implements OnInit {
  isError: boolean = false;
  isData: boolean = false;

  constructor() {}

  ngOnInit() {}

  //Upload Excel
  uploadZSD(event: any): void {
    let reader = new FileReader();
    this.isError = false;
    this.isData = false;
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (e: any) => {
      if (e != null) {
        try {
          let spreadSheetWorkBook = read(e.target.result, { type: 'binary' });
          const data = utils.sheet_to_json<any>(
            spreadSheetWorkBook.Sheets[spreadSheetWorkBook.SheetNames[0]]
          );
          if (data) this.isData = true;
          else this.isError = true;
        } catch (error) {
          this.isError = true;
        }
      }
    };
  }

  uploadSample(event: any) {
    var reader = new FileReader();
    reader.readAsBinaryString(event.target.files[0]);
    reader.onload = (e) => {
      let csvData = reader.result;
      let csvRecordsArray = (<any>csvData).trim().split(/\r\n|\n/);
      let header = csvRecordsArray[0].split(',');

      let headerdata = header.length;
      console.log(headerdata);
      for (var i = 1; i <= csvRecordsArray.length; i++) {
        var data = csvRecordsArray[i].split(',');
        var dataCount = data.length;
        if (headerdata !== dataCount) {
          this.isError = true;
        }
      }
      //}
      // }
    };
  }
}
