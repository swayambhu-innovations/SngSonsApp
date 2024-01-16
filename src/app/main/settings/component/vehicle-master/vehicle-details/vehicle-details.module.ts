import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { VehicleDetailsComponent } from './vehicle-details.component';
import { VehicleDetailsRoutingModule } from './vehicle-details-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    VehicleDetailsRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [VehicleDetailsComponent],
})
export class VehicleDetailsModule {}
