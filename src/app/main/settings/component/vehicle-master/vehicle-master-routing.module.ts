import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleMasterComponent } from './vehicle-master.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class vehicleMasterRoutingModule {}
