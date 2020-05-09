import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up.component';


const routes: Routes = [
    { path: 'sign-up', pathMatch: 'full', redirectTo: '' },
    {
        path:'', // rota/:param
        component: SignUpComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        // resolvers
    ]
})
export class SignUpRoutingModule { }