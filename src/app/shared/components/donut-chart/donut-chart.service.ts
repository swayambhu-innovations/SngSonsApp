import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import Chart from 'chart.js/auto';
import { ShipmentsService } from 'src/app/main/home/tabs/shipments/shipments.service';
import { ReceivingsService } from 'src/app/main/home/tabs/vendors/receivings.service';

@Injectable({
  providedIn: 'root',
})
export class DaywiseSummaryService {
  constructor(
    private shipmentsService: ShipmentsService,
    private recievingService: ReceivingsService
  ) {}
  selectedDate: any = new DatePipe('en-US').transform(new Date(), 'YYYY-MM-dd');
  chartDataDispatch: any = {
    'pending-dispatch': {
      count: 0,
      name: 'Pending Dispatch',
      color: '#DBE5F7',
    },
    'pending-post-delivery': {
      count: 0,
      name: 'Pending Post Delivery',
      color: '#AACBFF',
    },
    completed: { count: 0, name: 'Completed', color: '#1540BD' },
    suspended: { count: 0, name: 'Suspended', color: '#243873' },
  };
  chartDataRecieving: any = {
    pending: {
      count: 0,
      name: 'Pending',
      color: '#DBE5F7',
    },
    'pending-vehicle-entry': {
      count: 0,
      name: 'Pending Vehicle Entry',
      color: '#AACBFF',
    },
    completed: { count: 0, name: 'Completed', color: '#1540BD' },
    suspended: { count: 0, name: 'Suspended', color: '#243873' },
  };
  public totalShipment = 0;
  public chart: any;

  async getRecieving() {
    this.chartDataRecieving['pending'].count = 0;
    this.chartDataRecieving['pending-vehicle-entry'].count = 0;
    this.chartDataRecieving.completed.count = 0;
    this.chartDataRecieving.suspended.count = 0;
    this.totalShipment = 0;
    (
      await this.recievingService.getReceivingsByDate(this.selectedDate)
    ).docs.map((shipment: any) => {
      const data = shipment.data();
      this.chartDataRecieving[data.status].count =
        this.chartDataRecieving[data.status].count + 1;
    });

    const labeldata: string[] = [];
    const realdata: any[] = [];
    const colordata: string[] = [];
    let totShip = 0;
    Object.keys(this.chartDataRecieving).forEach((key) => {
      labeldata.push(this.chartDataRecieving[key].name);
      realdata.push(this.chartDataRecieving[key].count);
      colordata.push(this.chartDataRecieving[key].color);
      totShip += this.chartDataRecieving[key].count;
    });
    this.totalShipment = totShip;

    const chartExist = Chart.getChart('donut-chart');
    chartExist?.destroy();
    this.chart = new Chart('donut-chart', {
      type: 'doughnut',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Shipments',
            data: realdata,
            backgroundColor: colordata,
          },
        ],
      },
      options: {
        cutout: 40,
        rotation: -90,
        circumference: 180,
        aspectRatio: 2,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }

  async getShipments() {
    this.chartDataDispatch['pending-dispatch'].count = 0;
    this.chartDataDispatch['pending-post-delivery'].count = 0;
    this.chartDataDispatch.completed.count = 0;
    this.chartDataDispatch.suspended.count = 0;
    this.totalShipment = 0;
    (
      await this.shipmentsService.getShipmentsByDate(this.selectedDate)
    ).docs.map((shipment: any) => {
      const data = shipment.data();
      this.chartDataDispatch[data.status].count =
        this.chartDataDispatch[data.status].count + 1;
    });

    const labeldata: string[] = [];
    const realdata: any[] = [];
    const colordata: string[] = [];
    let totShip = 0;
    Object.keys(this.chartDataDispatch).forEach((key) => {
      labeldata.push(this.chartDataDispatch[key].name);
      realdata.push(this.chartDataDispatch[key].count);
      colordata.push(this.chartDataDispatch[key].color);
      totShip += this.chartDataDispatch[key].count;
    });
    this.totalShipment = totShip;

    const chartExist = Chart.getChart('donut-chart');
    chartExist?.destroy();
    this.chart = new Chart('donut-chart', {
      type: 'doughnut',
      data: {
        labels: labeldata,
        datasets: [
          {
            label: 'Shipments',
            data: realdata,
            backgroundColor: colordata,
          },
        ],
      },
      options: {
        cutout: 40,
        rotation: -90,
        circumference: 180,
        aspectRatio: 2,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });
  }
}
