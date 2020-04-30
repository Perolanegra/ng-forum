import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';


const routes: Routes = [
    { path: 'home', redirectTo: '', pathMatch: 'full' },
    {
        path:'', // rota/:param
        component: HomeComponent,
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