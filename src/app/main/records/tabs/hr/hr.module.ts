import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { HrComponent } from './hr.component';
import { EmployeesModule } from './tabs/employees/employees.module';
import { LaboursModule } from './tabs/labours/labours.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    LaboursModule,
    EmployeesModule,
    IonicModule,
    SharedModule,
  ],
  declarations: [HrComponent],
  exports: [HrComponent],
})
export class HrModule {}
