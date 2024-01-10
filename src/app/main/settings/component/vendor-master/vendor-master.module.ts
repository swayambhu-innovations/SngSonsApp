import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VendorMasterComponent } from './vendor-master.component';
import { vendorMasterRoutingModule } from './vendor-master-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    vendorMasterRoutingModule,
  ],
  declarations: [VendorMasterComponent],
})
export class VendorMasterModule {}
