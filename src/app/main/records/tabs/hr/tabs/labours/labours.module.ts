import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { LaboursComponent } from './labours.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule],
  declarations: [LaboursComponent],
  exports: [LaboursComponent],
})
export class LaboursModule {}
