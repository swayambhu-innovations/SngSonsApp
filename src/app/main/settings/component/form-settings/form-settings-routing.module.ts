import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormSettingComponent } from './form-settings.component';

const routes: Routes = [
  {
    path: '',
    component: FormSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormSettingsRoutingModule {}
