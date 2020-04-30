import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { GlobalVars } from 'src/app/core/globalVars';
import { AppActions } from './app.actions';

export class AppStateModel {
    hasMobileMatches: boolean;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        hasMobileMatches: null
    }
})

@Injectable()
export class AppState {

    constructor(private globalVars: GlobalVars) { }

    @Selector()
    static stateMobileMatches(state: AppStateModel): boolean {
        return state.hasMobileMatches;
    }

    @Action(AppActions.SetMediaScreen)
    setMediaScreen({ getState, setState }: StateContext<AppStateModel>, { hasMobileMatches }: AppActions.SetMediaScreen) {
        const state = getState();
        setState({
            ...state,
            hasMobileMatches: hasMobileMatches
        });

    }



}