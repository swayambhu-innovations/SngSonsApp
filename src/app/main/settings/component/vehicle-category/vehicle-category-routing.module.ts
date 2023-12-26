import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehicleCategoryComponent } from './vehicle-category.component';

const routes: Routes = [
  {
    path: '',
    component: VehicleCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class vehicleCategoryRoutingModule {}
