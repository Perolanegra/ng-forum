import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProfileComponent } from './profile.component';


const routes: Routes = [
    { path: 'profile', pathMatch: 'full', redirectTo: '' },
    {
        path:'', // rota/:param
        component: ProfileComponent,
    
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