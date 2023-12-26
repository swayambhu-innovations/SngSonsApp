import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { HeadUserBarComponent } from 'src/app/shared/components/head-user-bar/head-user-bar.component';
import { FormSettingsPageModule } from './component/form-settings/form-settings.module';
import { RouterModule } from '@angular/router';
import { VendorMasterModule } from './component/vendor-master/vendor-master.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule,
    SettingsPageRoutingModule,
    HeadUserBarComponent,
    FormSettingsPageModule,
    VendorMasterModule,
  ],
  declarations: [SettingsPage],
})
export class SettingsPageModule {}
