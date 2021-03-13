import { Component, OnInit } from '@angular/core';
import { NgDetails } from 'src/app/core/pattern/ng-details';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details-issue',
  templateUrl: './details-issue.component.html',
  styleUrls: ['./details-issue.component.scss']
})
export class DetailsIssueComponent extends NgDetails implements OnInit {
  

  constructor(protected route: ActivatedRoute) { 
    super(route);
  }

  ngOnInit(): void {
  }

  getHtml(payload: any): string {
    throw new Error("Method not implemented.");
  }

}
