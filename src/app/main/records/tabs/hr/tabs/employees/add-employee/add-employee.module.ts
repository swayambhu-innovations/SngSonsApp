import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddEmployeePageRoutingModule } from './add-employee-routing.module';

import { AddEmployeePage } from './add-employee.page';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddEmployeePageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [AddEmployeePage]
})
export class AddEmployeePageModule {}
