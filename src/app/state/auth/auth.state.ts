import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService } from '../../core/auth.service';
import { tap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { AuthActions } from './auth.actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVars } from 'src/app/core/globalVars';

export class AuthStateModel {
    token: string;
    user: UserModel
}

@State<AuthStateModel>({
    name: 'auth'
})

@Injectable()
export class AuthState {

    constructor(private authService: AuthService, private globalVars: GlobalVars) { }

    @Selector()
    static token(state: AuthStateModel) {
        return state.token;
    }

    @Selector()
    static userDetails(state: AuthStateModel): UserModel {
        return state.user;
    }

    @Action(AuthActions.Signin)
    async login({ getState, setState }: StateContext<AuthStateModel>, { username, password }: AuthActions.Signin) {

        const data: any = await this.authService.getAccessToken(username, password).toPromise();

        if(data) {
            const user = await this.authService.getUserByToken(data.access_token).toPromise();
            setState({
                token: data.access_token,
                user: user
            });
        }
    }

    @Action(AuthActions.RemoveAccess)
    removeAccess({ setState }: StateContext<AuthStateModel>) {
        setState({
            token: null,
            user: null
        });
    }

    @Action(AuthActions.ResetPassword)
    async resetPassword({ getState, setState }: StateContext<AuthStateModel>, { payload }: AuthActions.ResetPassword) {

        // const data: any = await this.authService.resetPassword(username, password).toPromise();

        // if(data) {
        //     const user = await this.authService.getUserByToken(data.access_token).toPromise();
        //     setState({
        //         token: data.access_token,
        //         user: user
        //     });
        // }
    }


}