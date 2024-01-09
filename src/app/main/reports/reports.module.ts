import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
import { HeadUserBarComponent } from 'src/app/shared/components/head-user-bar/head-user-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HeadUserBarComponent,
    ReportsPageRoutingModule,
  ],
  declarations: [ReportsPage],
})
export class ReportsPageModule {}
