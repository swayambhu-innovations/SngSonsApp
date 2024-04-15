import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { AssetsComponent } from './assets.component';
import { VehiclesModule } from './tabs/vehicles/vehicles.module';
import { SiteModule } from './tabs/site/site.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    VehiclesModule,
    SiteModule,
  ],
  declarations: [AssetsComponent],
  exports: [AssetsComponent],
})
export class AssetsModule {}
