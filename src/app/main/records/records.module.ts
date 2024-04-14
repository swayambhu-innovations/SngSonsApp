import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RecordsPageRoutingModule } from './records-routing.module';

import { RecordsPage } from './records.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PartiesModule } from './tabs/parties/parties.module';
import { HrModule } from './tabs/hr/hr.module';
import { AssetsModule } from './tabs/assets/assets.module';
import { AccountsModule } from './tabs/accounts/accounts.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PartiesModule,
    AssetsModule,
    AccountsModule,
    HrModule,
    SharedModule,
    RecordsPageRoutingModule,
  ],
  declarations: [RecordsPage],
})
export class RecordsPageModule {}
