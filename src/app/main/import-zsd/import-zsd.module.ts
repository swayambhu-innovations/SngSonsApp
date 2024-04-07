import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ImportZSDPageRoutingModule } from './import-zsd-routing.module';

import { ImportZSDPage } from './import-zsd.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    ImportZSDPageRoutingModule,
  ],
  declarations: [ImportZSDPage],
})
export class ImportZSDPageModule {}
