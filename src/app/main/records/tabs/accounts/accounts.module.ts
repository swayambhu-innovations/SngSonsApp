import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccountsComponent } from './accounts.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule,ReactiveFormsModule],
  declarations: [AccountsComponent],
  exports: [AccountsComponent],
})
export class AccountsModule {}
