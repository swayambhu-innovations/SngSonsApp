import { NgModule } from '@angular/core';
import { ImportExportComponent } from './import-export.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ImportExportRoutingModule } from './import-export-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, SharedModule, FormsModule,ImportExportRoutingModule],
  declarations: [ImportExportComponent],
})
export class ImportExportModule {}
