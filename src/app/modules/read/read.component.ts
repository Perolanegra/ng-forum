import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-read',
    templateUrl: './read.component.html',
    styleUrls: ['./read.component.scss']
}) 

export class ReadComponent implements OnInit {

  // @Select(TutorialState.getTutorials) tutorials$: Observable<Tutorial[]>;

  constructor(private store: Store) {
  }

  // delTutorial(name) {
  //   this.store.dispatch(new RemoveTutorialAction(name))
  // }

  ngOnInit() {}

}