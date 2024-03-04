import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShipmentDetailPageRoutingModule } from './shipment-detail-routing.module';

import { ShipmentDetailPage } from './shipment-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    ShipmentDetailPageRoutingModule
  ],
  declarations: [ShipmentDetailPage]
})
export class ShipmentDetailPageModule {}
