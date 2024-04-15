import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddSuppliersPageRoutingModule } from './add-suppliers-routing.module';

import { AddSuppliersPage } from './add-suppliers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddSuppliersPageRoutingModule,
  ],
  declarations: [AddSuppliersPage],
})
export class AddSuppliersPageModule {}
