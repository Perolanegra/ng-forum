import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NoAuthGuard } from './shared/guards/no-auth.guard';
import { TestGuard } from './shared/guards/test.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard]  }, 
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [NoAuthGuard] 
  },
  {
    path: 'configs',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [NoAuthGuard] 
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./modules/reset-password/reset-password.module').then(m => m.ResetPasswordModule),
    canActivate: [TestGuard] 
  }
  
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
export const AppRoutingModule = RouterModule.forRoot(routes, { useHash: true, onSameUrlNavigation: 'reload' });
