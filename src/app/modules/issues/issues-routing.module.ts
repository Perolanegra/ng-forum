import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { ListIssueComponent } from './list-issue/list-issue.component';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate.guard';
import { ListIssuesResolver } from './resolvers/list-issues.resolver';


const routes: Routes = [
    { path: ':pagination', redirectTo: 'list/:pagination', pathMatch: 'full' },
    {
        path: 'list/:pagination', // rota/:param
        component: ListIssueComponent,
        resolve: {
            issues: ListIssuesResolver
        },
        
    },
    {
        path: 'add/:id', // rota/:param
        component: AddIssueComponent,
        canDeactivate: [CanDeactivateGuard]
    },
    // {
    //     path: 'details/:id', // rota/:param
    //     component: DetailsIssueComponent,
    // },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        // resolvers
        ListIssuesResolver
    ]
})
export class IssuesRoutingModule { }