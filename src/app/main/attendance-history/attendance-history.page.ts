import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Location } from '@angular/common';
// import { EditInfoPermissionService } from "../edit-info/edit-info.service";
import { UtilService } from 'src/app/utils/util';
import { AttendanceHistoryService } from './service/attendance-history.service';
import { LoadingController } from '@ionic/angular';
import { Config } from 'src/app/config';

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.page.html',
  styleUrls: ['./attendance-history.page.scss'],
})
export class AttendanceHistoryPage implements OnInit {
  constructor(
    private location: Location,
    // private editInfoPermissionService: EditInfoPermissionService,
    private utilService: UtilService,
    private AttendanceHistoryService: AttendanceHistoryService,
    private loadingController: LoadingController
  ) {}
  userData: any;
  empData: any;
  loader: any;
  allEmpsData: any[] = [];
  attendanceHistory: any;

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();

    if (history.state.empData) {
      this.empData = JSON.parse(history.state.empData);
    }

    const data: any = this.utilService.getUserdata();
    this.userData = data?.access;
    this.attendanceHistory =
      await this.AttendanceHistoryService.getAttendanceHistory(
        this.empData.id,
        this.startDate,
        this.lastDate
      );
    this.loader.dismiss();

    // this.getAllEmps();
  }

  // async getAllEmps() {
  //   const data = await this.editInfoPermissionService.getUsers();
  //   data.docs.map((employee) => {
  //     this.allEmpsData.push({ ...employee.data(), id: employee.id });
  //   });
  // }

  startDate: Date = moment(new Date()).startOf('month').toDate();
  lastDate: Date = moment(new Date()).endOf('month').toDate();

  

  async updateStartDate(e: any) {
    this.startDate = moment(e.target.value).toDate();
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();

    this.attendanceHistory =
      await this.AttendanceHistoryService.getAttendanceHistory(
        this.empData.id,
        this.startDate,
        this.lastDate
      );
    this.loader.dismiss();
  }
  
  async updateLastDate(e: any) {
    this.lastDate = moment(e.target.value).toDate();
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();

    this.attendanceHistory =
      await this.AttendanceHistoryService.getAttendanceHistory(
        this.empData.id,
        this.startDate,
        this.lastDate
      );
    this.loader.dismiss();
  }

  formatDate(date: Date, format: string): string {
    return moment(date).format(format);
  }

  getStatusColor(status: boolean): string {
    return status ? '#29D25F' : '#EA712E';
  }

  goback() {
    // this.navCtrl.navigateBack(this.backURL);
    this.location.back();
  }
}
