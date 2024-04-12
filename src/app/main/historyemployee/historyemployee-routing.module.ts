import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryemployeePage } from './historyemployee.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryemployeePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryemployeePageRoutingModule {}
