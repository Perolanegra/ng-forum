import { Tutorial } from '../models/tutorial.model';

export class AddTutorial {
    static readonly type = 'state tutorial add';

    constructor(public payload: Tutorial) {

    }
}

export class RemoveTutorial {
    static readonly type = 'state tutorial remove';

    constructor(public payload: string) {
        
    }
}