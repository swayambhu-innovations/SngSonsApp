import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleMasterComponent } from './vehicle-master.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleMasterComponent,
  },
  {
    path: 'add-vehicle/:id',
    loadChildren: () =>
      import('./add-vehicle/add-vehicle.module').then(
        (m) => m.AddVehicleModule
      ),
  },
  {
    path: 'vehicle-details/:id',
    loadChildren: () =>
      import('./vehicle-details/vehicle-details.module').then(
        (m) => m.VehicleDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class vehicleMasterRoutingModule {}
