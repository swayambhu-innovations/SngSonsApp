import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormSettingComponent } from './form-settings.component';
import { FormSettingsRoutingModule } from './form-settings-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormSettingsRoutingModule
  ],
  declarations: [FormSettingComponent],
})
export class FormSettingsPageModule {}
