import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { ShipmentsComponent } from './tabs/shipments/shipments.component';
import { VehiclesComponent } from './tabs/vehicles/vehicles.component';
import { VendorsComponent } from './tabs/vendors/vendors.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ShipmentsComponent,
    VehiclesComponent,
    VendorsComponent,
  ],
  declarations: [HomePage],
})
export class HomePageModule {}
