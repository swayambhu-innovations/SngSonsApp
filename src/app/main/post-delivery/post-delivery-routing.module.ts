import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostDeliveryPage } from './post-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: PostDeliveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostDeliveryPageRoutingModule {}
