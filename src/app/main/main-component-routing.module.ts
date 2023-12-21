import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { HomePage } from './home/home.page';

const routes: Routes = [
  { path: '', component: MainComponent },
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
      import('./settings/settings.module').then((m) => m.SettingsPageModule),
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
    path: 'voucher/:id',
    loadChildren: () =>
      import('./generate-voucher/generate-voucher.module').then(
        (m) => m.GenerateVoucherPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainComponentRoutingModule {}
