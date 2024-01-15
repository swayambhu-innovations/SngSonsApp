import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { ShipmentsModule } from './tabs/shipments/shipments.module';
import { VehiclesModule } from './tabs/vehicles/vehicles.module';
import { VendorsModule } from './tabs/vendors/vendors.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    HomePageRoutingModule,
    ShipmentsModule,
    VehiclesModule,
    VendorsModule,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
