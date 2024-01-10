import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { VehicleMasterComponent } from './vehicle-master.component';
import { vehicleMasterRoutingModule } from './vehicle-master-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    vehicleMasterRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VehicleMasterComponent],
})
export class vehicleMasterModule {}
