import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import Chart from 'chart.js/auto';
import { ShipmentsService } from 'src/app/main/home/tabs/shipments/shipments.service';

@Injectable({
  providedIn: 'root',
})
export class DaywiseSummaryService {
  constructor(private shipmentsService: ShipmentsService) {}
  selectedDate: any = new DatePipe('en-US').transform(new Date(), 'YYYY-MM-dd');
  chartData: any = {
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
  public totalShipment = 0;
  public chart: any;

  async getShipments() {
    this.chartData['pending-dispatch'].count = 0;
    this.chartData['pending-post-delivery'].count = 0;
    this.chartData.completed.count = 0;
    this.chartData.suspended.count = 0;
    this.totalShipment = 0;
    (
      await this.shipmentsService.getShipmentsByDate(this.selectedDate)
    ).docs.map((shipment: any) => {
      const data = shipment.data();
      this.chartData[data.status].count = this.chartData[data.status].count + 1;
    });

    const labeldata: string[] = [];
    const realdata: any[] = [];
    const colordata: string[] = [];
    let totShip = 0;
    Object.keys(this.chartData).forEach((key) => {
      labeldata.push(this.chartData[key].name);
      realdata.push(this.chartData[key].count);
      colordata.push(this.chartData[key].color);
      totShip += this.chartData[key].count;
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
