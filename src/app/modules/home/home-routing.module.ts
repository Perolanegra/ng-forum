import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { AuthLoginResolver } from 'src/app/core/auth-login.resolver';


const routes: Routes = [
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    {
        path:'', // rota/:param
        component: HomeComponent,
        // resolve: {
        //     user: AuthLoginResolver
        // },
        // runGuardsAndResolvers: 'paramsChange'
        // canActivate: [NoAuthGuard],
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        // resolvers
        // AuthLoginResolver
    ]
})
export class HomeRoutingModule { }