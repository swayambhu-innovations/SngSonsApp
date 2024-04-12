import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bar-graph-table',
  templateUrl: './bar-graph-table.component.html',
  styleUrls: ['./bar-graph-table.component.scss'],
})
export class BarGraphTableComponent implements OnInit {
  selectedDate = new DatePipe('en-US').transform(new Date(), 'YYYY-MM-dd');
  // 
  // public receivedAmounts: number[] = [70]; // Array of received amounts
  // public totalAmount = 100; // Total amou
  
  constructor() {}

   datas = [
    { category: 'Total Expense', receivedAmount: 15000, totalAmount:  23500 },
    { category: 'Khuraki', receivedAmount: 13000, totalAmount: 23500 },
    { category: 'Frieght', receivedAmount: 3000, totalAmount: 23500 },
    { category: 'Tolls', receivedAmount: 12000, totalAmount: 23500 },
    { category: 'Repairs',receivedAmount:  17000, totalAmount :23500 },
    { category: 'Others',receivedAmount:  19000, totalAmount: 23500 }
  ];
  @Input() heading = '';
  ngOnInit() {}

  get dateText() {
    const dt = new DatePipe('en-US').transform(this.selectedDate, 'dd MMM');
    return dt;
  }

  onChange(e: any) {
    this.selectedDate = new DatePipe('en-US').transform(
      e.target.value ? e.target.value : new Date(),
      'YYYY-MM-dd'
    );
  }
}
