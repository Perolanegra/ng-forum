import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';


const routes: Routes = [
    {
        path:'home', // rota/:param
        component: HomeComponent,
        // resolve: {
        // },
        // canActivate: [NoAuthGuard],
        data: {
          breadcrumb: 'Home'
        },
        redirectTo: 'home', 
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
export class HomeRoutingModule { }