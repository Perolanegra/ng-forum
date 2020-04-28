
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { AppController } from './appController';
import { DefaultResolver } from './default.resolver';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthState } from '../state/auth/auth.state';
import { Select } from '@ngxs/store';

@Injectable()
export class AuthLoginResolver extends DefaultResolver {

    @Select(AuthState.userDetails) user$: Observable<UserModel>;

    constructor(private appController: AppController) {
        super();
    }

    resolver(pParams: any) {
        return this.user$.pipe(map(resp => console.log('resp: ', resp)));
    }
}