import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountErrorPageRoutingModule } from './account-error-routing.module';

import { AccountErrorPage } from './account-error.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountErrorPageRoutingModule
  ],
  declarations: [AccountErrorPage]
})
export class AccountErrorPageModule {}
