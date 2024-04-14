import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PartiesComponent } from './parties.component';
import { VendorMasterModule } from 'src/app/main/settings/component/vendor-master/vendor-master.module';
import { VendorsModule } from './tabs/vendors/vendors.module';
import { SuppliersModule } from './tabs/suppliers/suppliers.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    VendorsModule,
    SuppliersModule,
  ],
  declarations: [PartiesComponent],
  exports: [PartiesComponent],
})
export class PartiesModule {}
