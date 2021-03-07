import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { ListIssueComponent } from './list-issue/list-issue.component';


const routes: Routes = [
    { path: '', redirectTo:  'list', pathMatch: 'full' },
    {
        path: 'list', // rota/:param
        component: ListIssueComponent,
    },
    {
        path: 'add', // rota/:param
        component: AddIssueComponent,
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        // resolvers
    ]
})
export class IssuesRoutingModule { }