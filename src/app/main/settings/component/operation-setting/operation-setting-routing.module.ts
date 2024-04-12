import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperationSettingPage } from './operation-setting.page';

const routes: Routes = [
  {
    path: '',
    component: OperationSettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationSettingPageRoutingModule {}
