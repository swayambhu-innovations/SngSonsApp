import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddVehicleComponent } from './add-vehicle.component';

const routes: Routes = [
  {
    path: '',
    component: AddVehicleComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddVehicleRoutingModule {}
