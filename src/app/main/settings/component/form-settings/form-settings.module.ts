import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormSettingComponent } from './form-settings.component';
import { FormSettingsRoutingModule } from './form-settings-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    FormSettingsRoutingModule,
  ],
  declarations: [FormSettingComponent],
})
export class FormSettingsPageModule {}
