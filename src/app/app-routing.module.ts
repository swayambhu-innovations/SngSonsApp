import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/login/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./main/main.module').then((m) => m.MainComponentModule),
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./splash-screen/splash-screen.module').then(
        (m) => m.SplashScreenPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
