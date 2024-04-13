import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GenerateZmmVoucherPage } from './generate-zmm-voucher.page';

const routes: Routes = [
  {
    path: '',
    component: GenerateZmmVoucherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GenerateZmmVoucherPageRoutingModule {}
