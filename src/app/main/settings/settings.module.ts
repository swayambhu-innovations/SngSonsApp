import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingsPageRoutingModule } from './settings-routing.module';

import { SettingsPage } from './settings.page';
import { HeadUserBarComponent } from 'src/app/shared/components/head-user-bar/head-user-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingsPageRoutingModule,
    HeadUserBarComponent,
    FormSettingsPageModule,
    RouterModule,
  ],
  declarations: [SettingsPage],
})
export class SettingsPageModule {}
