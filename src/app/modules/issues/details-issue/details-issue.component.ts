import { Component, OnInit } from '@angular/core';
import { NgDetails } from 'src/app/core/pattern/ng-details';
import { ActivatedRoute } from '@angular/router';
import { AppController } from 'src/app/core/appController';

@Component({
  selector: 'app-details-issue',
  templateUrl: './details-issue.component.html',
  styleUrls: ['./details-issue.component.scss']
})
export class DetailsIssueComponent extends NgDetails implements OnInit {

  constructor(protected route: ActivatedRoute, protected appController: AppController) { 
    super(route, appController);
  }

  ngOnInit(): void {
  }

  getHtml(payload: any): string {
    throw new Error("Method not implemented.");
  }

}
