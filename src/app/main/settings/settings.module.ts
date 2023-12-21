import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { HeadUserBarComponent } from '../components/head-user-bar/head-user-bar.component';
import { FormSettingsPageModule } from './component/form-settings/form-settings.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    HeadUserBarComponent,
    FormSettingsPageModule,
    RouterModule
  ],
  declarations: [SettingsPage],
})
export class SettingsPageModule {}
