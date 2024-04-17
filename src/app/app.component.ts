import { Component, OnInit } from '@angular/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { TodayAttendanceService } from './main/today-attendance/today-attendance.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private TodayAttendanceService: TodayAttendanceService) {
    this.TodayAttendanceService.initLocation();
  }
  ngOnInit() {
    this.splash();
  }

  async splash() {
    await SplashScreen.show({
      showDuration: 2000,
      autoHide: true,
    });
  }
}
