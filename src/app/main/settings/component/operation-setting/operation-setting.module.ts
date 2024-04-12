import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OperationSettingPageRoutingModule } from './operation-setting-routing.module';

import { OperationSettingPage } from './operation-setting.page';
import { HeaderWithBackComponent } from 'src/app/shared/components/header-with-back/header-with-back.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    OperationSettingPageRoutingModule,
   
  ],
  declarations: [OperationSettingPage]
})
export class OperationSettingPageModule {}
