import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
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
export class DonutChartComponent implements OnInit {
  loader: any;
  @Output() messageEvent = new EventEmitter<string>();
  @Input() summary: any;

  constructor(
    public donutChartService: DonutChartService,
    private sharedService: SharedService,
    private loadingController: LoadingController
  ) {
    
  }

  async ngOnInit() {
    this.donutChartService.getShipments(this.summary);
    console.log(this.summary)
  }
  ngOnChanges(){
    this.donutChartService.getShipments(this.summary);

  }
  ionViewWillEnter() {
    this.donutChartService.getShipments(this.summary);
  }
  sendToParent(date: any) {
    this.messageEvent.emit(date);
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
    await this.sendToParent(e.target.value);
    this.loader = await this.loadingController.create({
      message: Config.messages.refresh,
    });
    this.loader.present();
    this.donutChartService.getShipments(this.summary);
    this.loader.dismiss();
  }
}
