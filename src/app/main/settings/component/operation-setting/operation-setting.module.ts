import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperationSettingPageRoutingModule } from './operation-setting-routing.module';

import { OperationSettingPage } from './operation-setting.page';
import { HeaderWithBackComponent } from 'src/app/shared/components/header-with-back/header-with-back.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GoogleMapsModule } from '@angular/google-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    SharedModule,
    OperationSettingPageRoutingModule,
  ],
  declarations: [OperationSettingPage],
})
export class OperationSettingPageModule {}
