import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportZSDPage } from './import-zsd.page';

const routes: Routes = [
  {
    path: '',
    component: ImportZSDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportZSDPageRoutingModule {}
