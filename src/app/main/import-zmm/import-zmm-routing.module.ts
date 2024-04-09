import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportZmmPage } from './import-zmm.page';

const routes: Routes = [
  {
    path: '',
    component: ImportZmmPage
  },
  {
    path: 'file-details',
    loadChildren: () => import('./file-details/file-details.module').then( m => m.FileDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportZmmPageRoutingModule {}
