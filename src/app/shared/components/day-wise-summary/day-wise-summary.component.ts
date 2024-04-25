import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DaywiseSummaryService } from './day-wise-summary.service';
import { SharedService } from '../../shared.service';
import { AutoUnsubscribe } from 'src/app/utils/autoUnsubscriber';
import { LoadingController } from '@ionic/angular';
import { Config } from 'src/app/config';

@AutoUnsubscribe
@Component({
  selector: 'app-day-wise-summary',
  templateUrl: './day-wise-summary.component.html',
  styleUrls: ['./day-wise-summary.component.scss'],
})
export class DayWiseSummaryComponent implements OnInit {
  loader: any;
  constructor(
    public daywiseSummaryService: DaywiseSummaryService,
    private sharedService: SharedService,
    private loadingController: LoadingController
  ) {
    this.sharedService.refresh.subscribe((data) => {
      if (data) {
        if (this.isDispatch) this.daywiseSummaryService.getShipments();
        else this.daywiseSummaryService.getRecieving();
        if (this.isAttendance) this.daywiseSummaryService.getRecieving();
      }
    });
  }

  @Input() isDispatch = false;
  @Input() isAttendance = false;

  async ngOnInit() {
    if (this.isDispatch) this.daywiseSummaryService.getShipments();
    else this.daywiseSummaryService.getRecieving();
    if (this.isAttendance) this.daywiseSummaryService.getRecieving();
  }

  get dateText() {
    const dt = new DatePipe('en-US').transform(
      this.daywiseSummaryService.selectedDate,
      'dd MMM'
    );
    return dt;
  }

  async dispDate(e: any) {
    this.daywiseSummaryService.selectedDate = new DatePipe('en-US').transform(
      e.target.value ? e.target.value : new Date(),
      'YYYY-MM-dd'
    );
    this.loader = await this.loadingController.create({
      message: Config.messages.refresh,
    });
    this.loader.present();
    if (this.isDispatch) this.daywiseSummaryService.getShipments();
    else this.daywiseSummaryService.getRecieving();
    if (this.isAttendance) this.daywiseSummaryService.getRecieving();
    this.loader.dismiss();
  }
}
