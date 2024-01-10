import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddVendorPageRoutingModule } from './add-vendor-routing.module';

import { AddVendorPage } from './add-vendor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AddVendorPageRoutingModule,
  ],
  declarations: [AddVendorPage],
})
export class AddVendorPageModule {}
