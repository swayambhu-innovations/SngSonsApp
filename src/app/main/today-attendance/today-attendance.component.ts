import { Component, OnInit } from "@angular/core";
import { LoadingController, NavController, Platform } from "@ionic/angular";
import * as moment from "moment";
import { Config } from "src/app/config";
import { UtilService } from "src/app/utils/util";
import { TodayAttendanceService } from "./today-attendance.service";
import { NotificationService } from "src/app/utils/notification";
import { LocationService } from "../locationmanagement/location.service";
import { firstValueFrom, Subject } from "rxjs";
import { Position } from "@capacitor/geolocation";
import { Geolocation } from "@capacitor/geolocation";

@Component({
  selector: 'app-today-attendance',
  templateUrl: './today-attendance.component.html',
  styleUrls: ['./today-attendance.component.scss'],
})
export class TodayAttendanceComponent  implements OnInit {
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
  currentPosition: google.maps.LatLngLiteral | undefined;
  loader: any;
  currentLocation: Subject<Position> = new Subject<Position>();
  workplaceArea: any;
  userList: any[] = [];
  attendanceMap: { [key: string]: { id: string; present: boolean } } = {};
  presentCount = 0;
  absentCount = 0;
  startDate: Date = moment(new Date()).startOf("month").toDate();
  lastDate: Date = moment(new Date()).startOf("month").toDate();

  async ngOnInit() {
    this.loader = await this.loadingController.create({
      message: Config.messages.markingAttendance,
    });
    const data: any = this.utilService.getUserdata();
    this.userData = data?.access;
    this.getArea();
    const coordinates = await Geolocation.getCurrentPosition();
    this.currentPosition = {
      lat: coordinates?.coords.latitude, //here
      lng: coordinates?.coords.longitude, //here
    };
    // if (this.platform.is("capacitor")) {
    //   await firstValueFrom(this.currentLocation).then((position: any) => {
    //     this.currentPosition = {
    //       lat: coordinates.coords.latitude,//here
    //       lng: coordinates.coords.longitude,//here
    //     };
    //   });
    // } else
    //   navigator.geolocation.getCurrentPosition(
    //     (position: GeolocationPosition) => {
    //       this.currentPosition = {
    //         lat: position.coords.latitude,
    //         lng: position.coords.longitude,
    //       };
    //     }
    //   );

    this.getUserList();
    this.getAttendance();
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
  }

  isMarked(userId: any) {
    return this.attendanceMap.hasOwnProperty(userId);
  }
  isPresent(userId: any) {
    return this.attendanceMap[userId].present
      ? "Marked Present"
      : "Marked Absent";
  }

  getStatusColor(userId: any): string {
    return this.attendanceMap[userId].present ? "#29D25F" : "#EA712E";
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
    if (event.detail.value == "true") {
      await this.TodayAttendanceService.markEmployeeAttendance(userId, {
        id: userId.toString(),
        present: true,
      });
      this.attendanceMap[userId] = { id: userId.toString(), present: true };
      this.presentCount++;
      this.notificationService.showSuccess(Config.messages.markAttendance);
    } else {
      await this.TodayAttendanceService.markEmployeeAttendance(userId, {
        id: userId.toString(),
        present: false,
      });
      this.attendanceMap[userId] = { id: userId.toString(), present: false };
      this.absentCount++;
    }
    this.loader.dismiss();
  }

  async getArea() {
    await this.locationService.getArea(this.userData?.areaID).then((data) => {
      this.workplaceArea = data.data();
    });
  }

  // geo-fencing
  async getLocation() {
    let loader = await this.loadingController.create({
      message: "Getting location...",
    });
    loader.present();
    const isValid = this.locationService.setPointerOutside(
      this.workplaceArea?.cordinates,
      this.currentPosition,
      this.workplaceArea?.radius
    );
    loader.dismiss();
    return isValid;
  }

  async markPresent() {
    this.loader.present();
    this.validMarker = await this.getLocation();
    if (this.validMarker) {
      this.attendanceMap[this.userData.phone] = {
        id: this.userData.phone.toString(),
        present: true,
      };
      this.presentCount++;
      this.TodayAttendanceService.markAttendance(this.userData.phone);
      this.notificationService.showSuccess(Config.messages.markAttendance);
    } else this.notificationService.showError(Config.messages.locationNotFound);
    this.loader.dismiss();
  }
}