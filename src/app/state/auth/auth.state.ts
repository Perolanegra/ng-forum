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
    rPassResponse: any;
    notAuth: string;
    hasResetPass: boolean;
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        user: null,
        forgotPassResponse: null,
        rPassResponse: null,
        notAuth: null,
        hasResetPass: false,
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
    static rPassResponse(state: AuthStateModel) {
        return state.rPassResponse;
    }

    @Selector()
    static notAuth(state: AuthStateModel): string {
        return state.notAuth;
    }

    @Selector()
    static hasResetPass(state: AuthStateModel): boolean {
        return state.hasResetPass;
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
    removeAccess({ setState, getState }: StateContext<AuthStateModel>) {
        const state = getState();
        setState({
            ...state,
            token: null,
            notAuth: null,
            forgotPassResponse: null,
            user: null,
            rPassResponse: null,
        });
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
                rPassResponse: data
            });
        }
    }

    @Action(AuthActions.SetResetToken)
    async setResetToken({ getState, setState }: StateContext<AuthStateModel>, { payload }: AuthActions.SetResetToken) {
        if (payload) {
            const state = getState();
            setState({
                ...state,
                token: payload
            });
        }
    }

    @Action(AuthActions.SetNotAuth)
    async setNotAuth({ getState, setState }: StateContext<AuthStateModel>, { payload }: AuthActions.SetNotAuth) {
        if (payload) {
            const state = getState();
            setState({
                ...state,
                notAuth: payload,
                rPassResponse: null
            });
        }
    }

    @Action(AuthActions.SetResetedPassword)
    async setResetedPassword({ getState, setState }: StateContext<AuthStateModel>, { payload }: AuthActions.SetResetedPassword) {
        if (payload) {
            const state = getState();
            setState({
                ...state,
                hasResetPass: payload
            });
        }
    }

    @Action(AuthActions.RemoveNotAuth)
    async removeNotAuth({ getState, setState }: StateContext<AuthStateModel>) {
        const state = getState();
        setState({
            ...state,
            notAuth: null
        });
    }

    @Action(AuthActions.RemoveHasReset)
    removeHasReset({ setState, getState }: StateContext<AuthStateModel>) {
        const state = getState();
        setState({
            ...state,
            hasResetPass: null
        });
    }

    @Action(AuthActions.RemoveToken)
    removeToken({ setState, getState }: StateContext<AuthStateModel>) {
        const state = getState();
        setState({
            ...state,
            token: null
        });
    }


}