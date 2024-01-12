import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-day-wise-summary',
  templateUrl: './day-wise-summary.component.html',
  styleUrls: ['./day-wise-summary.component.scss'],
})
export class DayWiseSummaryComponent implements OnInit {
  date: string = '13 Aug';

  constructor() {}

  ngOnInit() {}

  dispDate(e: any) {
    this.date = e.target.value;
    const date: any = new DatePipe('en-US').transform(this.date, 'dd MMM');
    console.log(date);
    this.date = date?.toString();
  }
}
