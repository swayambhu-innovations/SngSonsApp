import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportZmmPageRoutingModule } from './import-zmm-routing.module';

import { ImportZmmPage } from './import-zmm.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ImportZmmPageRoutingModule
  ],
  declarations: [ImportZmmPage]
})
export class ImportZmmPageModule {}
