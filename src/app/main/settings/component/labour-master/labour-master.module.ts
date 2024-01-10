import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { LabourMasterRoutingModule } from './labour-master-routing.module';
import { LabourMasterComponent } from './labour-master.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    LabourMasterRoutingModule,
  ],
  declarations: [LabourMasterComponent],
})
export class VendorMasterModule {}
