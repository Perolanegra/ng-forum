import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService } from '../../core/auth.service';
import { UserModel } from 'src/app/models/user.model';
import { AuthActions } from './auth.actions';
import { Injectable } from '@angular/core';
import { NgxsDataRepository } from '@ngxs-labs/data/repositories';
import { StateRepository } from '@ngxs-labs/data/decorators';

export class AuthStateModel {
    token: string;
    user: UserModel;
    forgotPassResponse: any;
    rPassResponse: any;
    notAuth: string;
    hasResetPass: boolean;
    signUpResponse: any;
}
@StateRepository()
@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        user: null,
        forgotPassResponse: null,
        rPassResponse: null,
        signUpResponse: null,
        notAuth: null,
        hasResetPass: false,
    }
})

@Injectable()
export class AuthState extends NgxsDataRepository<AuthStateModel> {

    constructor(private authService: AuthService) {
        super();
     }

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
    static signUpResponse(state: AuthStateModel) {
        return state.signUpResponse;
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
    async signIn({ getState, setState }: StateContext<AuthStateModel>, { username, password }: AuthActions.Signin) {

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

    @Action(AuthActions.Signup)
    async setStateSignUp({ patchState }: StateContext<AuthStateModel>, { payload }: AuthActions.Signup) {

        const data: any = await this.authService.signUp(payload).toPromise();

        if (data) {
            patchState({ signUpResponse: data })
        }
    }

    @Action(AuthActions.RemoveStateSignup)
    async removeStateSignUp({ getState, setState }: StateContext<AuthStateModel>, { }: AuthActions.RemoveStateSignup) {
        const state = getState();
        setState({
            ...state,
            signUpResponse: null
        });
    }

    @Action(AuthActions.RemoveAccess)
    removeAccess({ setState, getState }: StateContext<AuthStateModel>) {
        const state = getState();
        setState({
            ...state,
            signUpResponse: null,
            forgotPassResponse: null, // tenho q ver o fluxo desse kra antes de remover
            notAuth: null, // tenho q ver o fluxo desse kra antes de remover
            token: null,
            user: null,
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