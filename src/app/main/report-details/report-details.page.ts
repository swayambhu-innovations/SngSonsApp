import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-report-details',
  templateUrl: './report-details.page.html',
  styleUrls: ['./report-details.page.scss'],
})
export class ReportDetailsPage implements OnInit {
  id: any;
  date1: string = '13 Aug';
  date2: string = '13 Sep';

  openColVariables: boolean = false;

  constructor(private navCtrl: NavController, private route: ActivatedRoute) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  goBack() {
    this.navCtrl.back();
  }

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
