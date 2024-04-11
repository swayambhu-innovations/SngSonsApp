
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../shared.service';
import { AutoUnsubscribe } from 'src/app/utils/autoUnsubscriber';
import { LoadingController } from '@ionic/angular';
import { Config } from 'src/app/config';
import { DonutChartService } from './donut-chart-service';

@AutoUnsubscribe
@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.scss'],
})
export class DonutChartComponent  implements OnInit {
  loader: any;
  constructor(
    public donutChartService: DonutChartService,
    private sharedService: SharedService,
    private loadingController: LoadingController
  ) {
    this.sharedService.refresh.subscribe((data) => {
      if (data) {
        this.donutChartService.getShipments();
      }
    });
  }

  async ngOnInit() {
    this.donutChartService.getShipments();
  }

  get dateText() {
    const dt = new DatePipe('en-US').transform(
      this.donutChartService.selectedDate,
      'dd MMM'
    );
    return dt;
  }

  async dispDate(e: any) {
    this.donutChartService.selectedDate = new DatePipe('en-US').transform(
      e.target.value ? e.target.value : new Date(),
      'YYYY-MM-dd'
    );
    this.loader = await this.loadingController.create({
      message: Config.messages.refresh,
    });
    this.loader.present();
    this.donutChartService.getShipments();
    this.loader.dismiss();
  }
}

