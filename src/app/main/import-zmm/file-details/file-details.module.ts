import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FileDetailsPageRoutingModule } from './file-details-routing.module';

import { FileDetailsPage } from './file-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FileDetailsPageRoutingModule
  ],
  declarations: [FileDetailsPage]
})
export class FileDetailsPageModule {}
