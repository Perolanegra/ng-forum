import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';


const routes: Routes = [
    {
        path:'profile', // rota/:param
        component: ProfileComponent,
        // resolve: {
        // },
        // canActivate: [NoAuthGuard],
        data: {
          breadcrumb: 'Perfil'
        },
        redirectTo: 'profile', 
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        // resolvers
    ]
})
export class ProfileRoutingModule { }