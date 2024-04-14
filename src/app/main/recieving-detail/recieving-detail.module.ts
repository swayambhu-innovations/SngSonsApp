import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecievingDetailPageRoutingModule } from './recieving-detail-routing.module';

import { SharedModule } from 'src/app/shared/shared.module';
import { RecievingDetailPage } from './recieving-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ReactiveFormsModule,
    RecievingDetailPageRoutingModule,
  ],
  declarations: [RecievingDetailPage],
})
export class RecievingDetailPageModule {}
