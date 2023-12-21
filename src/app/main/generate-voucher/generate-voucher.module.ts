import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateVoucherPageRoutingModule } from './generate-voucher-routing.module';

import { GenerateVoucherPage } from './generate-voucher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateVoucherPageRoutingModule
  ],
  declarations: [GenerateVoucherPage]
})
export class GenerateVoucherPageModule {}
