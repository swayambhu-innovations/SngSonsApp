import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-day-wise-summary',
  templateUrl: './day-wise-summary.component.html',
  styleUrls: ['./day-wise-summary.component.scss'],
  imports: [IonicModule],
  standalone: true,
})
export class DayWiseSummaryComponent implements OnInit {
  date: string = '13 Aug';

  constructor() {}

  ngOnInit() {}

  dispDate(e: any) {
    console.log(e.target.value);
    this.date = e.target.value;
  }
}
