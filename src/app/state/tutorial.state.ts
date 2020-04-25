import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Tutorial } from './../models/tutorial.model'
import { AddTutorial, RemoveTutorial } from  '../../app/actions/tutorial.action';

export class TutorialStateModel {
    tutorials: Tutorial[];
}

// Section 3
@State<TutorialStateModel>({
    name: 'tutorials',
    defaults: {
        tutorials: []
    }
})

export class TutorialState {
    
    @Selector()
    static getTutorials(state: TutorialStateModel) {
        return state.tutorials;
    }

    @Action(AddTutorial) 
    add({ getState, patchState }: StateContext<TutorialStateModel>, { payload }: AddTutorial) {
        const state = getState();
        patchState({
            tutorials: [...state.tutorials, payload]
        });
    }

    @Action(RemoveTutorial) 
    remove({ getState, patchState }: StateContext<TutorialStateModel>, { payload }: RemoveTutorial) {
        patchState({
            tutorials: getState().tutorials.filter(a => a.name != payload)
        });
    }
}