import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeesComponent } from './employees.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule],
  declarations: [EmployeesComponent],
  exports: [EmployeesComponent],
})
export class EmployeesModule {}
