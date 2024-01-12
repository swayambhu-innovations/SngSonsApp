import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportDetailsPageRoutingModule } from './report-details-routing.module';

import { ReportDetailsPage } from './report-details.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportDetailsPageRoutingModule,
    SharedModule,
  ],
  declarations: [ReportDetailsPage],
})
export class ReportDetailsPageModule {}
