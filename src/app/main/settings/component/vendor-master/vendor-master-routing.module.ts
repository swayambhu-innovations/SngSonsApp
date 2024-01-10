import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorMasterComponent } from './vendor-master.component';

const routes: Routes = [
  {
    path: '',
    component: VendorMasterComponent
  },
  {
    path: 'add-vendor',
    loadChildren: () => import('./add-vendor/add-vendor.module').then( m => m.AddVendorPageModule)
  },
  {
    path: 'vendor-details',
    loadChildren: () => import('./vendor-details/vendor-details.module').then( m => m.VendorDetailsModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class vendorMasterRoutingModule {}
