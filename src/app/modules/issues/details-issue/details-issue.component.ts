import { Component, OnInit, ViewChild } from "@angular/core";
import { NgDetails } from "src/app/core/pattern/ng-details";
import { ActivatedRoute } from "@angular/router";
import { AppController } from "src/app/core/appController";
import { MatAccordion } from "@angular/material/expansion";
import { Store } from "@ngxs/store";
import { IssueActions } from 'src/app/state/issue/issue.actions';

@Component({
  selector: "app-details-issue",
  templateUrl: "./details-issue.component.html",
  styleUrls: ["./details-issue.component.scss"],
})
export class DetailsIssueComponent extends NgDetails implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(
    protected route: ActivatedRoute,
    protected appController: AppController,
    private store: Store
  ) {
    super(route, appController);
  }

  ngOnInit(): void {
    this.data = this.dataResolved["details"];
    setTimeout(() => {
      this.markView()
    }, 800);

    // if(this.route.snapshot.params['hasPoll']) {
    //   this.setPollComponent()
    // }
  }

  markView() {
    this.store.dispatch(new IssueActions.MarkView({ id_issue: +this.route.snapshot.params['id'] }))
  }

  // setPollComponent() {

  // }

  getHtml(payload: any): string {
    throw new Error("Method not implemented.");
  }

  add() {
    throw new Error("Method not implemented.");
  }
}
