import { Injectable } from '@angular/core';
import { DefaultResolver } from '../../../core/default.resolver';
import { IssuesService } from '../issues.service';
import { map } from 'rxjs/operators';

@Injectable()
export class ListIssuesResolver extends DefaultResolver {
    
    constructor(private service: IssuesService) {
        super();
    }

    // TODO: voltando tem que resolver esse cara.
    resolver(params: any) {
        console.log('params resolver: ', params);
        return;
        // return this.service.getWithPagination(params.pagination).pipe(map(val => val));
    }

}