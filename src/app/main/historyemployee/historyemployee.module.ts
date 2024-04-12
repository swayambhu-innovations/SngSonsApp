import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryemployeePageRoutingModule } from './historyemployee-routing.module';

import { HistoryemployeePage } from './historyemployee.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryemployeePageRoutingModule,SharedModule
  ],
  declarations: [HistoryemployeePage]
})
export class HistoryemployeePageModule {}
