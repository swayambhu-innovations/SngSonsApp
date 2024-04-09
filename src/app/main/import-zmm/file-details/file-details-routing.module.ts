import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FileDetailsPage } from './file-details.page';

const routes: Routes = [
  {
    path: '',
    component: FileDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FileDetailsPageRoutingModule {}
