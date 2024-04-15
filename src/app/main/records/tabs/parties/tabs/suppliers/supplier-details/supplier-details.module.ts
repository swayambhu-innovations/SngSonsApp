import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupplierDetailsPageRoutingModule } from './supplier-details-routing.module';

import { SupplierDetailsPage } from './supplier-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SupplierDetailsPageRoutingModule,
  ],
  declarations: [SupplierDetailsPage],
})
export class SupplierDetailsPageModule {}
