import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImportZSDPage } from './import-zsd.page';

const routes: Routes = [
  {
    path: '',
    component: ImportZSDPage
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
export class ImportZSDPageRoutingModule {}
