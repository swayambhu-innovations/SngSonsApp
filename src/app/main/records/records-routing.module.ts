import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecordsPage } from './records.page';

const routes: Routes = [
  {
    path: '',
    component: RecordsPage,
  },
  {
    path: 'add-suppliers',
    loadChildren: () => import('./tabs/parties/tabs/suppliers/add-suppliers/add-suppliers.module').then( m => m.AddSuppliersPageModule)
  },
  {
    path: 'supplier-details/:id',
    loadChildren: () => import('./tabs/parties/tabs/suppliers/supplier-details/supplier-details.module').then( m => m.SupplierDetailsPageModule)
  },  {
    path: 'add-employee',
    loadChildren: () => import('./tabs/hr/tabs/employees/add-employee/add-employee.module').then( m => m.AddEmployeePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecordsPageRoutingModule {}
