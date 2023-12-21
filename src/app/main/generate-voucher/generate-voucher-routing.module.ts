import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateVoucherPage } from './generate-voucher.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateVoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateVoucherPageRoutingModule {}
