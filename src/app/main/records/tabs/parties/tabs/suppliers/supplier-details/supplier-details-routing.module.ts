import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupplierDetailsPage } from './supplier-details.page';

const routes: Routes = [
  {
    path: '',
    component: SupplierDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierDetailsPageRoutingModule {}
