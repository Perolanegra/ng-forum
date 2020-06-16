
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Observable } from 'rxjs';
import { Select } from '@ngxs/store';
import { DefaultResolver } from 'src/app/core/default.resolver';
import { AuthState } from 'src/app/state/auth/auth.state';

@Injectable()
export class IssuesResolver extends DefaultResolver {

    @Select(AuthState.userDetails) issues$: Observable<any>;

    constructor() {
        super();
    }

    resolver(pParams: any) {
        return this.issues$.pipe(map(resp => resp));
    }
}