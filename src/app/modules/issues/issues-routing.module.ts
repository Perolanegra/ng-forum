import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AddIssueComponent } from './add-issue/add-issue.component';
import { ListIssueComponent } from './list-issue/list-issue.component';
import { CanDeactivateGuard } from '../../shared/guards/can-deactivate.guard';
import { DetailsIssueComponent } from './details-issue/details-issue.component';
import { ListIssueTagsResolver } from './resolvers/list-issue-tags.resolver';
import { DetailsByIdResolver } from './resolvers/details-by-id.resolver';


const routes: Routes = [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    {
        path: 'list', // rota/:param
        component: ListIssueComponent,
        
    },
    {
        path: 'add/:id', // rota/:param
        component: AddIssueComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
            tags: ListIssueTagsResolver
        }
    },
    {
        path: 'details/:id', // rota/:param
        component: DetailsIssueComponent,
        resolve: {
            details: DetailsByIdResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [
        // resolvers
        CanDeactivateGuard,
        ListIssueTagsResolver,
        DetailsByIdResolver
    ]
})
export class IssuesRoutingModule { }