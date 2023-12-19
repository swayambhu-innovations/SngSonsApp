import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  date1: string = '13 Aug';
  date2: string = '13 Sep';
  constructor() {}

  ngOnInit() {}

  dispDate(convertDate: any) {
    const date: any = new DatePipe('en-US').transform(convertDate, 'dd MMM');
    return date?.toString();
  }

  startDate(e: any) {
    this.date1 = this.dispDate(e.target.value);
  }

  endDate(e: any) {
    this.date2 = this.dispDate(e.target.value);
  }
}
