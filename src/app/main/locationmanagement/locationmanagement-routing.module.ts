import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocationmanagementPage } from './locationmanagement.page';

const routes: Routes = [
  {
    path: '',
    component: LocationmanagementPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocationmanagementPageRoutingModule {}