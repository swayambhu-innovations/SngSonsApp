import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostDeliveryPageRoutingModule } from './post-delivery-routing.module';

import { PostDeliveryPage } from './post-delivery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PostDeliveryPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PostDeliveryPage]
})
export class PostDeliveryPageModule {}
