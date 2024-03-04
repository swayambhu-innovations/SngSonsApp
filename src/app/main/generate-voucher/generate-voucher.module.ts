import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GenerateVoucherPageRoutingModule } from './generate-voucher-routing.module';

import { GenerateVoucherPage } from './generate-voucher.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GenerateVoucherPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [GenerateVoucherPage]
})
export class GenerateVoucherPageModule {}
