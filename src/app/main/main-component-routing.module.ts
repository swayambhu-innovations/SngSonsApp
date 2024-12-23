import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'history',
        loadChildren: () =>
          import('./history/history.module').then((m) => m.HistoryPageModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then(
            (m) => m.SettingsPageModule
          ),
      },
      {
        path: 'notifications',
        loadChildren: () =>
          import('./notifications/notifications.module').then(
            (m) => m.NotificationsPageModule
          ),
      },
      {
        path: 'shipment/:id',
        loadChildren: () =>
          import('./shipment-detail/shipment-detail.module').then(
            (m) => m.ShipmentDetailPageModule
          ),
      },
      {
        path: 'recieving/:id',
        loadChildren: () =>
          import('./recieving-detail/recieving-detail.module').then(
            (m) => m.RecievingDetailPageModule
          ),
      },
      {
        path: 'voucher/:id',
        loadChildren: () =>
          import('./generate-voucher/generate-voucher.module').then(
            (m) => m.GenerateVoucherPageModule
          ),
      },
      {
        path: 'voucher/post-delivery/:id',
        loadChildren: () =>
          import('./post-delivery/post-delivery.module').then(
            (m) => m.PostDeliveryPageModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsPageModule),
      },
      {
        path: 'reports/:id',
        loadChildren: () =>
          import('./report-details/report-details.module').then(
            (m) => m.ReportDetailsPageModule
          ),
      },
      {
        path: 'import-zsd',
        loadChildren: () =>
          import('./import-zsd/import-zsd.module').then(
            (m) => m.ImportZSDPageModule
          ),
      },
      {
        path: 'import-zmm',
        loadChildren: () =>
          import('./import-zmm/import-zmm.module').then(
            (m) => m.ImportZmmPageModule
          ),
      },
      {
        path: 'historyemployee',
        loadChildren: () =>
          import('./historyemployee/historyemployee.module').then(
            (m) => m.HistoryemployeePageModule
          ),
      },
      {
        path: 'locationmanagement',
        loadChildren: () =>
          import('./locationmanagement/locationmanagement.module').then(
            (m) => m.LocationmanagementPageModule
          ),
      },
      {
        path: 'attendance-history',
        loadChildren: () =>
          import('./attendance-history/attendance-history.module').then(
            (m) => m.AttendanceHistoryPageModule
          ),
      },
      {
        path: 'today-attendance',
        loadChildren: () =>
          import('./today-attendance/today-attendance.module').then(
            (m) => m.TodayAttendancePageModule
          ),
      },
      {
        path: 'zmm-voucher/:id',
        loadChildren: () =>
          import('./generate-zmm-voucher/generate-zmm-voucher.module').then(
            (m) => m.GenerateZmmVoucherPageModule
          ),
      },
      {
        path: 'records',
        loadChildren: () =>
          import('./records/records.module').then((m) => m.RecordsPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainComponentRoutingModule {}
