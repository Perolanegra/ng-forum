import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';


const routes: Routes = [
  // { path: '', pathMatch: 'full', redirectTo: '' },
  { path: '', pathMatch: 'full', component: LoginComponent }, // voltar dps
  { 
    path: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
