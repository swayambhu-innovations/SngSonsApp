import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { TodayAttendancePageRoutingModule } from "./today-attendance-routing.module";

import { TodayAttendancePage } from "./today-attendance.page";
import { GoogleMapsModule } from "@angular/google-maps";
import { SharedModule } from "src/app/shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GoogleMapsModule,
    TodayAttendancePageRoutingModule,
  ],
  declarations: [TodayAttendancePage],
})
export class TodayAttendancePageModule {}
