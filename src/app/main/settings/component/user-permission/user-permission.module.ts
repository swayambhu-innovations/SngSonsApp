import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { UserPermissionComponent } from './user-permission.component';
import { userPermissionRoutingModule } from './user-permission-routing.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    IonicModule,
    userPermissionRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UserPermissionComponent],
})
export class UserPermissionModule {}
