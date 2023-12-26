import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LabourMasterComponent } from './labour-master.component';

const routes: Routes = [
  {
    path: '',
    component: LabourMasterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LabourMasterRoutingModule {}
