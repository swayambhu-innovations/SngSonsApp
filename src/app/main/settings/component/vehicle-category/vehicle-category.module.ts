import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { VehicleCategoryComponent } from './vehicle-category.component';
import { vehicleCategoryRoutingModule } from './vehicle-category-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    vehicleCategoryRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VehicleCategoryComponent],
})
export class vehicleCategoryModule {}
