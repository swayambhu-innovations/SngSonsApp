import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  reports: any[] = [
    { vendor: 'Vendor Wise Expenses Report' },
    { vehicle: 'Vehicle Wise Expenses Report' },
    { area: 'Area Wise Expenses Report' },
    { accounts: 'Account Wise Payment Report' },
    { shipments: 'Shipments Wise Expenses Report' },
    { labor: 'Labor Party Wise Expenses Report' },
  ];
  id: string = '';

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  openReportDetail(key: any) {
    this.reports.forEach((item) => {
      if (item[key]) this.id = item[key];
    });
    this.navCtrl.navigateForward(`main/reports/${this.id}`, {
      state: { id: this.id },
    });
  }
}
