import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryPageRoutingModule } from './history-routing.module';

import { HistoryPage } from './history.page';
import { VoucherComponent } from 'src/app/shared/components/voucher/voucher.component';
import { HeadUserBarComponent } from 'src/app/shared/components/head-user-bar/head-user-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryPageRoutingModule,
    VoucherComponent,
    HeadUserBarComponent,
  ],
  declarations: [HistoryPage],
})
export class HistoryPageModule {}
