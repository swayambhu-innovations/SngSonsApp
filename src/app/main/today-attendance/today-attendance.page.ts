import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, Platform } from '@ionic/angular';
import * as moment from 'moment';
import { Config } from 'src/app/config';
import { UtilService } from 'src/app/utils/util';
import { TodayAttendanceService } from './today-attendance.service';
import { NotificationService } from 'src/app/utils/notification';
import { LocationService } from '../locationmanagement/location.service';
import { firstValueFrom, Subject } from 'rxjs';
import { Position } from '@capacitor/geolocation';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-today-attendance',
  templateUrl: './today-attendance.page.html',
  styleUrls: ['./today-attendance.page.scss'],
})
export class TodayAttendancePage implements OnInit {
  constructor(
    private locationService: LocationService,
    private notificationService: NotificationService,
    private utilService: UtilService,
    private platform: Platform,
    private loadingController: LoadingController,
    private TodayAttendanceService: TodayAttendanceService
  ) {}

  userData: any;
  validMarker: boolean = false;
  currentPosition: google.maps.LatLngLiteral;
  loader: any;
  currentLocation: Subject<Position> = new Subject<Position>();
  workplaceArea: any;
  userList: any[] = [];
  attendanceMap: { [key: string]: { id: string; present: boolean } } = {};
  presentCount = 0;
  absentCount = 0;
  startDate: Date = moment(new Date()).startOf('month').toDate();
  lastDate: Date = moment(new Date()).startOf('month').toDate();

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.pleaseWait,
    });
    this.loader.present();

    const data: any = await this.utilService.getUserdata();
    this.userData = data?.access;
    this.getArea();
    const coordinates = await Geolocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    });
    this.currentPosition = {
      lat: coordinates?.coords.latitude, //here
      lng: coordinates?.coords.longitude, //here;
    };

    console.log('Accuracy:', coordinates.coords.accuracy, 'meters');

    this.currentPosition.lat =
      Math.round(this.currentPosition.lat * 10000) / 10000;
    this.currentPosition.lng =
      Math.round(this.currentPosition.lng * 10000) / 10000;

    await this.getUserList();
    await this.getAttendance();
    this.getLocation();
    // this.notificationService.showError(`${this.currentPosition.lat}`);
    this.loader.dismiss();
  }

  async getUserList() {
    await this.TodayAttendanceService.getUserList().then((data: any) => {
      data.docs.map((data: any) => {
        this.userList.push(data.data());
      });
    });
  }
  async getAttendance() {
    const currentDate = new Date();
    const todayDate = currentDate.getDate().toString();
    this.presentCount = 0;
    this.absentCount = 0;

    await this.TodayAttendanceService.getAttendance().then((data) => {
      data.docs.map((attendance) => {
        const userAttendance = attendance.data()[todayDate];
        if (userAttendance?.present !== undefined) {
          this.attendanceMap[attendance.id] = {
            id: attendance.id,
            present: userAttendance.present,
          };
          if (userAttendance.present) {
            this.presentCount++;
          } else {
            this.absentCount++;
          }
        }
      });
    });
    this.isMarked(this.userData?.phone);
  }

  isAttendanceMarked: String = 'Pending';
  isMarked(userId: any) {
    if (this.attendanceMap.hasOwnProperty(userId)) {
      if (this.attendanceMap[userId].present) {
        this.isAttendanceMarked = 'present';
      } else {
        this.isAttendanceMarked = 'absent';
      }
    } else {
      this.isAttendanceMarked = 'pending';
    }
  }

  isPresent(userId: any) {
    if (!this.attendanceMap.hasOwnProperty(userId)) {
      return '';
    } else {
      return this.attendanceMap[userId].present ? 'true' : 'false';
    }
  }

  getStatusColor(userId: any): String {
    if (!this.attendanceMap.hasOwnProperty(userId)) {
      return '#1540BD';
    } else {
      return this.attendanceMap[userId].present ? '#29D25F' : '#EA712E';
    }
  }

  updateStartDate(e: any) {
    this.startDate = moment(e.target.value).toDate();
  }
  updateLastDate(e: any) {
    this.lastDate = moment(e.target.value).toDate();
  }

  formatDate(date: Date, format: string): string {
    return moment(date).format(format);
  }

  async markEmployeeAttendance(event: CustomEvent, userId: number) {
    this.loader.present();

    if (event.detail.value == 'true' || event.detail.value == 'false') {
      await this.TodayAttendanceService.markEmployeeAttendance(userId, {
        offPremises: 10,
        present: event.detail.value == 'true' ? true : false,
      });

      this.notificationService.showSuccess(
        event.detail.value == 'true'
          ? Config.messages.markAttendance
          : Config.messages.markAbsent
      );
      
    }
    this.getAttendance();

    this.loader.dismiss();
  }

  async getArea() {
    await this.locationService.getArea(this.userData?.areaID).then((data) => {
      this.workplaceArea = data.data();

      this.workplaceArea.cordinates.lat =
        Math.round(this.workplaceArea?.cordinates.lat * 10000) / 10000;
      this.workplaceArea.cordinates.lng =
        Math.round(this.workplaceArea?.cordinates.lng * 10000) / 10000;
    });
  }

  // geo-fencing
  async getLocation() {
    console.log(
      this.workplaceArea?.cordinates,
      this.currentPosition,
      this.workplaceArea?.radius
    );
    return this.locationService.setPointerOutside(
      this.workplaceArea?.cordinates,
      this.currentPosition,
      this.workplaceArea?.radius
    );
  }
  async markPresent() {
    this.loader.present();
    //this.validMarker = await this.getLocation();
    if (true) {
      await this.TodayAttendanceService.markAttendance(this.userData.phone);

      this.notificationService.showSuccess(Config.messages.markAttendance);
    } else this.notificationService.showError(Config.messages.locationNotFound);
    this.getAttendance();
    this.loader.dismiss();
  }
}
