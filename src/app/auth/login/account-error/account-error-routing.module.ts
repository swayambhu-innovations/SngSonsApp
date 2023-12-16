import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountErrorPage } from './account-error.page';

const routes: Routes = [
  {
    path: '',
    component: AccountErrorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountErrorPageRoutingModule {}
