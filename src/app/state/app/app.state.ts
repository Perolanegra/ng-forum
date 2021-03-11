import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { AppActions } from './app.actions';

export class AppStateModel {
    hasMobileMatches: boolean;
    routes: any;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
        hasMobileMatches: null,
        routes: null
    }
})

@Injectable()
export class AppState {

    constructor() { }

    @Selector()
    static hasMobileMatches(state: AppStateModel): boolean {
        return state.hasMobileMatches;
    }

    @Selector()
    static routes(state: AppStateModel): Object {
        return state.routes;
    }


    @Action(AppActions.SetMediaScreen)
    setMediaScreen({ patchState }: StateContext<AppStateModel>, { hasMobileMatches }: AppActions.SetMediaScreen) {
        patchState({ hasMobileMatches })
    }

    @Action(AppActions.SetRouteState)
    setRouteState({ patchState }: StateContext<AppStateModel>, { payload }: AppActions.SetRouteState) {
        patchState({ routes: payload });
    }

    @Action(AppActions.RemoveRouteState)
    removeRouteState({ getState, setState }: StateContext<AppStateModel>) {
        const state = getState();
        setState({
            ...state,
            routes: null
        });
    }

}