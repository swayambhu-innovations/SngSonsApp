import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage,
  },
  {
    path: 'form-settings',
    loadChildren: () =>
      import('./component/form-settings/form-settings.module').then(
        (m) => m.FormSettingsPageModule
      ),
  },
  {
    path: 'vendor-master',
    loadChildren: () =>
      import('./component/vendor-master/vendor-master.module').then(
        (m) => m.VendorMasterModule
      ),
  },
  {
    path: 'labour-master',
    loadChildren: () =>
      import('./component/labour-master/labour-master.module').then(
        (m) => m.VendorMasterModule
      ),
  },
  {
    path: 'vehicle-master',
    loadChildren: () =>
      import('./component/vehicle-master/vehicle-master.module').then(
        (m) => m.vehicleMasterModule
      ),
  },
  {
    path: 'vehicle-category',
    loadChildren: () =>
      import('./component/vehicle-category/vehicle-category.module').then(
        (m) => m.vehicleCategoryModule
      ),
  },
  {
    path: 'import-export',
    loadChildren: () =>
      import('./component/import-export/import-export.module').then(
        (m) => m.ImportExportModule
      ),
  },
  {
    path: 'account-expense',
    loadChildren: () =>
      import('./component/account-expense/account-expense.module').then(
        (m) => m.AccountExpenseModule
      ),
  },
  {
    path: 'user-permission',
    loadChildren: () =>
      import('./component/user-permission/user-permission.module').then(
        (m) => m.UserPermissionModule
      ),
  },
  {
    path: 'edit-profile',
    loadChildren: () =>
      import('./component/edit-profile/edit-profile.module').then(
        (m) => m.EditProfileModule
      ),
  },
  {
    path: 'business-info',
    loadChildren: () => import('./component/business-info/business-info.module').then( m => m.BusinessInfoPageModule)
  },

  {
    path: 'operation-setting',
    loadChildren: () => import('./component/operation-setting/operation-setting.module').then( m => m.OperationSettingPageModule)
  },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
