import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './reset-password.component';


const routes: Routes = [
    { path: 'reset-password', redirectTo: '', pathMatch: 'full' },
    {
        path:'', // rota/:param
        component: ResetPasswordComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        // resolvers
    ]
})
export class ResetPasswordRoutingModule { }