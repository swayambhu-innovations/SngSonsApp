import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodayAttendancePage } from './today-attendance.page';

const routes: Routes = [
  {
    path: '',
    component: TodayAttendancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TodayAttendancePageRoutingModule {}
