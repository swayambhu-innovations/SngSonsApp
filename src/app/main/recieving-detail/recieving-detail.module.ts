import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecievingDetailPageRoutingModule } from './recieving-detail-routing.module';

import { RecievingDetailPage } from './recieving-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RecievingDetailPageRoutingModule,
  ],
  declarations: [RecievingDetailPage],
})
export class RecievingDetailPageModule {}
