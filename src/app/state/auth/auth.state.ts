import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService } from '../../core/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { AuthActions } from './auth.actions';
import { Injectable } from '@angular/core';
import { GlobalVars } from 'src/app/core/globalVars';

export class AuthStateModel {
    token: string;
    user: UserModel;
    forgotPassResponse: any;
    resetedPassword: any;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        user: null,
        forgotPassResponse: null,
        resetedPassword: false
    }
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

    @Selector()
    static forgotPassResponse(state: AuthStateModel) {
        return state.forgotPassResponse;
    }

    @Selector()
    static resetPassResponse(state: AuthStateModel) {
        return state.resetedPassword;
    }

    @Action(AuthActions.Signin)
    async login({ getState, setState }: StateContext<AuthStateModel>, { username, password }: AuthActions.Signin) {

        const data: any = await this.authService.getAccessToken(username, password).toPromise();

        if (data) {
            const user = await this.authService.getUserByToken(data.access_token).toPromise();
            const state = getState();
            setState({
                ...state,
                token: data.access_token,
                user: user
            });
        }
    }

    @Action(AuthActions.RemoveAccess)
    removeAccess({ setState }: StateContext<AuthStateModel>) {
        setState(null);
    }

    @Action(AuthActions.ForgotPassword)
    async forgotPassword({ getState, setState }: StateContext<AuthStateModel>, { payload }: AuthActions.ForgotPassword) {

        const data: any = await this.authService.setForgotPass(payload).toPromise();

        if (data) {
            const state = getState();
            setState({
                ...state,
                forgotPassResponse: data
            });
        }
    }

    @Action(AuthActions.ResetPass)
    async resetPass({ getState, setState }: StateContext<AuthStateModel>, { payload }: AuthActions.ForgotPassword) {

        const data: any = await this.authService.resetPass(payload).toPromise();

        if (data) {
            const state = getState();
            setState({
                ...state,
                resetedPassword: data
            });
        }
    }


}