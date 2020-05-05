import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ng-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewChecked {

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    
    
  }

  ngAfterViewChecked() {    

  }

}
