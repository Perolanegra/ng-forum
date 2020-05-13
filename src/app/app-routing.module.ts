import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { TestGuard } from './shared/guards/test.guard';
import { NoAuthGuard } from './shared/guards/no-auth.guard';
import { LoginAuthGuard } from './shared/guards/login-auth.guard';
import { ResetPasswordGuard } from './shared/guards/reset-pass.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [LoginAuthGuard]  }, 
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [NoAuthGuard] 
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [TestGuard] 
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    canActivate: [TestGuard] 
  },
  {
    path: 'sign-up',
    loadChildren: () => import('./modules/sign-up/sign-up.module').then(m => m.SignUpModule),
    canActivate: [NoAuthGuard] 
  },
  
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' });
