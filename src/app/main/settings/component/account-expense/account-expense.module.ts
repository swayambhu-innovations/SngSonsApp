import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountExpenseComponent } from './account-expense.component';
import { AccountExpenseRoutingModule } from './account-expense-routing.module';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    AccountExpenseRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [
    AccountExpenseComponent,
    ExpenseDetailsComponent
  ],
})
export class AccountExpenseModule { }
