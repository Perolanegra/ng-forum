import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'LoginComponent' }, // voltar dps
  { path: 'LoginComponent', component: LoginComponent }, 
  {
    path: 'home',
    loadChildren: () => import('./modules/home/home-routing.module').then(m => m.HomeRoutingModule)
    // canActivate
  }
  // { 
  //   path: '',
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
