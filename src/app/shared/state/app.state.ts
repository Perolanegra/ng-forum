import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { GlobalVars } from 'src/app/core/globalVars';
import { AppActions } from './app.actions';

export class AppStateModel {
    hasMobileMatches: boolean;
    statePath: string;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        hasMobileMatches: null,
        statePath: 'login'
    }
})

@Injectable()
export class AppState {

    constructor(private globalVars: GlobalVars) { }

    @Selector()
    static stateMobileMatches(state: AppStateModel): boolean {
        return state.hasMobileMatches;
    }

    @Selector()
    static sessionState(state: AppStateModel): string {
        return state.statePath;
    }

    @Action(AppActions.SetMediaScreen)
    setMediaScreen({ getState, setState }: StateContext<AppStateModel>, { hasMobileMatches }: AppActions.SetMediaScreen) {
        const state = getState();
        setState({
            ...state,
            hasMobileMatches: hasMobileMatches
        });

    }

    @Action(AppActions.SetSessionState)
    setSessionState({ getState, setState }: StateContext<AppStateModel>, { statePath }: AppActions.SetSessionState) {
        const state = getState();
        setState({
            ...state,
            statePath: statePath
        });

    }



}