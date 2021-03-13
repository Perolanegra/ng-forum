import { Component, OnInit } from "@angular/core";
import { IssuesModel } from "../../../models/issues.model";
import { AppController } from "src/app/core/appController";
import { IssuesService } from "../issues.service";
import { ActivatedRoute, Data } from "@angular/router";
import { NgTags } from "src/app/shared/components/ng-tags/ng-tags";
import { NgDefaultList } from "src/app/core/pattern/ng-default-list";
import { SelectSnapshot } from '@ngxs-labs/select-snapshot';
import { AppState } from 'src/app/state/app/app.state';

@Component({
  selector: "ng-list-issue",
  templateUrl: "./list-issue.component.html",
  styleUrls: ["./list-issue.component.scss"],
})
export class ListIssueComponent extends NgDefaultList implements OnInit {
  @SelectSnapshot(AppState.pagination) pagination: number | string;
  constructor(
    public appController: AppController,
    protected service: IssuesService,
    protected route: ActivatedRoute
  ) {
    super(route, {
      columnsTable: ["issues", "post", "stars", "views", "info"],
      classes: {
        issues: ["make-gold"],
        post: ["post-col"],
        stars: ["stars-col"],
        views: ["views-col"],
        info: ["info-col"],
      },
    });
  }

  public tagColorMock = "crimson,#22262e,#22262e,#22262e";

  public rowSkeletonTheme = {
    height: "70px",
    width: "55vw",
    "background-color": "#E91E63",
    "animation-duration": "2s",
    opacity: "0.7",
  };

  public titleSkeletonTheme = {
    height: "70px",
    width: "60vw",
    "background-color": "#E91E63",
    "animation-duration": "2s",
    opacity: "0.7",
  };

  ngOnInit() {
    this.dataTable = this.service.getWithPagination(+this.pagination);
  }

  getTagsHTML(tags: string, colors: string): string | undefined {
    if (tags) {
      const tagComponent = new NgTags(tags, this.appController, colors);
      return tagComponent.createTagElement();
    }
  }

  // TODO: Configurar a forma de manipular a data na aplicação.
  public getHtml(payload: { col: number; data: IssuesModel }): string {
    const { col, data } = payload;
    const obj = {
      1: `<div class="iss-content">
            <span class="iss-title">${data.title}</span>
            <span class="iss-subtitle">${data.subtitle}</span>
            <div class="iss-author">@author ${data.author}</div>
          </div>`,
      2: `<div class="iss-content iss-content-row">
            <span class="iss-table-line iss-table-line__data">${
              data.posts_number
            }</span>
            <span class="iss-table-line"><img class="iss-table-line__svg" src="${
              col === 2 ? this.appController.getImg("issue-post.svg") : ""
            }"></span>
          </div>`,
      3: `<div class="iss-content iss-content-row">
            <span class="iss-stars-out">${
              col === 3
                ? this.appController.countStars(data as IssuesModel)
                : ""
            }</span>
            <span class="iss-stars-average">${(
              data.stars / data.pplVoted
            ).toFixed(1)}</span>
          </div>`,
      4: `<div class="iss-content iss-content-row">
            <span class="iss-table-line iss-table-line__data">${
              data.views
            }</span>
            <span class="iss-table-line"><img class="iss-table-line__svg" src="${
              col === 4 ? this.appController.getImg("issue-views2.svg") : ""
            }"></span>
          </div>`,
      5: `<div class="iss-content info-content">
            <div class="iss-content iss-content-row">
              <div class="iss-img-out">
                <img src="http://placeimg.com/320/320/people" class="iss-img" />
              </div>
              <div class="iss-info">
                <b>by</b> <span class="iss-info-author">${data.author}</span>
                <div>${new Date(data.created_at).toLocaleDateString()}</div>
              </div>
            </div>
            <div class="iss-tags">
             ${this.getTagsHTML(data.tags, this.tagColorMock)}
            </div>
          </div>`,
    };

    return obj[col] || undefined;
  }

  public onPaginate(pagination: number) {
    console.log("pagination: ", pagination);
    // this.store.dispatch(new AppActions.SetRouteState(navs));

    // this.issueService.getWithPagination(pagination).subscribe((response: IssuesModel[]) => {
    //   if(response.length) {
    //     // this.data = response;
    //     console.log('this.data: ', response);
    //   }
    // });
  }
}
