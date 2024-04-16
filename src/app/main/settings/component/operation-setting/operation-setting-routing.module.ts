import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OperationSettingPage } from './operation-setting.page';

const routes: Routes = [
  {
    path: '',
    component: OperationSettingPage
  },  {
    path: 'add-location',
    loadChildren: () => import('./add-location/add-location.module').then( m => m.AddLocationPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OperationSettingPageRoutingModule {}
