import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-graph-table',
  templateUrl: './bar-graph-table.component.html',
  styleUrls: ['./bar-graph-table.component.scss'],
})
export class BarGraphTableComponent implements OnInit {
  selectedDate = new DatePipe('en-US').transform(new Date(), 'YYYY-MM-dd');
  constructor() {}

  @Input() heading = '';
  ngOnInit() {}

  get dateText() {
    const dt = new DatePipe('en-US').transform(this.selectedDate, 'dd MMM')
    return dt
  }

  onChange(e: any) {
    this.selectedDate = new DatePipe('en-US').transform(e.target.value, 'YYYY-MM-dd');
  }
}
