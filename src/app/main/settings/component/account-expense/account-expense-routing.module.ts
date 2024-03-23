import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountExpenseComponent } from './account-expense.component';
import { ExpenseDetailsComponent } from './expense-details/expense-details.component';
import { AccountDetailsComponent } from './account-details/account-details.component';

const routes: Routes = [
  {
    path: '',
    component: AccountExpenseComponent,
  },
  {
    path: 'expense-details',
    component: ExpenseDetailsComponent,
  },
  {
    path: 'account-details',
    component: AccountDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountExpenseRoutingModule {}
