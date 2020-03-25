import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NoAuthGuard } from './shared/guards/no-auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' }, // voltar dps
  { path: 'login', component: LoginComponent, canActivate: [NoAuthGuard]  }, 
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'profile',
    loadChildren: () => import('./modules/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard] 
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
