import { Observable } from 'rxjs';
import { IssueTagState } from './issue-tag.state';
import { Select } from '@ngxs/store';

export class TagsReducer {
    @Select(IssueTagState.tags) tags$: Observable<any>;

    constructor() { }

    public getTags() {
        return this.tags$.subscribe(state => state , err => err);
    }

}