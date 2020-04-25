import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RemoveTutorial } from 'src/app/actions/tutorial.action';
import { Tutorial } from 'src/app/models/tutorial.model';
import { TutorialState } from 'src/app/state/tutorial.state';

@Component({
    selector: 'app-read',
    templateUrl: './read.component.html',
    styleUrls: ['./read.component.scss']
}) 

export class ReadComponent implements OnInit {

  
  @Select(TutorialState.getTutorials) tutorials$: Observable<Tutorial[]>;

  constructor(private store: Store) {
  }

  delTutorial(name) {
    this.store.dispatch(new RemoveTutorial(name))
  }

  ngOnInit() {}

}