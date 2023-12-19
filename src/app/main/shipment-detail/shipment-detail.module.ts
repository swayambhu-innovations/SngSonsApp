import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShipmentDetailPageRoutingModule } from './shipment-detail-routing.module';

import { ShipmentDetailPage } from './shipment-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShipmentDetailPageRoutingModule
  ],
  declarations: [ShipmentDetailPage]
})
export class ShipmentDetailPageModule {}
