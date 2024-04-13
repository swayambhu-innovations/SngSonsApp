import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateZmmVoucherPageRoutingModule } from './generate-zmm-voucher-routing.module';

import { GenerateZmmVoucherPage } from './generate-zmm-voucher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    GenerateZmmVoucherPageRoutingModule,
  ],
  declarations: [GenerateZmmVoucherPage],
})
export class GenerateZmmVoucherPageModule {}
