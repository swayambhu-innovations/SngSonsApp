import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DaywiseSummaryService } from './day-wise-summary-service';
import { log } from 'console';

@Component({
  selector: 'app-day-wise-summary',
  templateUrl: './day-wise-summary.component.html',
  styleUrls: ['./day-wise-summary.component.scss'],
})
export class DayWiseSummaryComponent implements OnInit {
  constructor(public daywiseSummaryService: DaywiseSummaryService) {}

  async ngOnInit() {
    this.daywiseSummaryService.getShipments();
  }

  get dateText() {
    const dt = new DatePipe('en-US').transform(
      this.daywiseSummaryService.selectedDate,
      'dd MMM'
    );
    return dt;
  }

  dispDate(e: any) {
    this.daywiseSummaryService.selectedDate = e.target.value;
    this.daywiseSummaryService.getShipments();
  }
}
