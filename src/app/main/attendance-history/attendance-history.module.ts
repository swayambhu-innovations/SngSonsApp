import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AttendanceHistoryPageRoutingModule } from './attendance-history-routing.module';

import { AttendanceHistoryPage } from './attendance-history.page';

import {FormGroup, FormControl,ReactiveFormsModule} from '@angular/forms';
import {JsonPipe} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';

import { MatNativeDateModule } from '@angular/material/core';
// import {provideNativeDateAdapter} from '@angular/material/core';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AttendanceHistoryPageRoutingModule,
    MatNativeDateModule,
MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe],
  // providers: [provideNativeDateAdapter()],
  declarations: [AttendanceHistoryPage]
})
export class AttendanceHistoryPageModule {}
