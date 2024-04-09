import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportZmmPage } from './import-zmm.page';

const routes: Routes = [
  {
    path: '',
    component: ImportZmmPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportZmmPageRoutingModule {}
