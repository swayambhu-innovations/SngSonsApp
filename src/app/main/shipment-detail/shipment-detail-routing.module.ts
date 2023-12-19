import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShipmentDetailPage } from './shipment-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ShipmentDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShipmentDetailPageRoutingModule {}
