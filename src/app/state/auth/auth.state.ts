import { State, Selector, Action, StateContext } from '@ngxs/store';
import { AuthService, User } from '../../core/auth.service';
import { tap } from 'rxjs/operators';
import { UserModel } from 'src/app/models/user.model';
import { AuthActions } from './auth.actions';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export class AuthStateModel {
    token: string;
    user: UserModel
}

@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        token: null,
        user: null
    }
})

@Injectable()
export class AuthState {

    constructor(private authService: AuthService) { }

    @Selector()
    static token(state: AuthStateModel) {
        return state.token;
    }

    @Selector()
    static userDetails(state: AuthStateModel): UserModel {
        return state.user;
    }

    @Action(AuthActions.Signin)
    login({ getState, setState }: StateContext<AuthStateModel>, { username, password }: AuthActions.Signin) {
        return this.authService.getAccessToken(username, password)
            .subscribe((data: { access_token: string }) => {
                if (data) {
                    this.authService.getUserByToken(data.access_token)
                        .subscribe((user: UserModel) => {
                            setState({
                                token: data.access_token,
                                user: user
                            })
                        })
                }
            });

    }

    // @Action(AuthActions.Signout)
    // logout({ setState, getState }: StateContext<AuthStateModel>) {
    //     const { token } = getState();
    //     return this.authService.signout().pipe(
    //         tap(_ => {
    //             setState({});
    //         })
    //     );
    // }


}