import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecievingDetailPage } from './recieving-detail.page';

const routes: Routes = [
  {
    path: '',
    component: RecievingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecievingDetailPageRoutingModule {}
