import { Component, OnInit, ViewChild } from '@angular/core';
import { NgDetails } from 'src/app/core/pattern/ng-details';
import { ActivatedRoute } from '@angular/router';
import { AppController } from 'src/app/core/appController';
import { MatAccordion } from '@angular/material/expansion';

@Component({
  selector: 'app-details-issue',
  templateUrl: './details-issue.component.html',
  styleUrls: ['./details-issue.component.scss']
})
export class DetailsIssueComponent extends NgDetails implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(protected route: ActivatedRoute, protected appController: AppController) { 
    super(route, appController);
  }

  ngOnInit(): void {
    this.data = this.dataResolved['details'];
    console.log('data ngOnInit: ', this.data);
  }

  getHtml(payload: any): string {
    throw new Error("Method not implemented.");
  }

  add() {
    throw new Error("Method not implemented.");
  }

}
