import { Component, Input, OnInit } from "@angular/core";
import { AppController } from "src/app/core/appController";



@Component({
  selector: "ng-tags",
  templateUrl: "./ng-tags.component.html",
  styleUrls: ["./ng-tags.component.scss"],
})

export class NgTagsComponent implements OnInit {
  readonly TAG_ID = 'ng_tag_element';

  constructor(private appController: AppController) {}

  @Input() tags: string;

  ngOnInit(): void {
    this.createTagElement();
  }

  createTagElement() {
    const arrTags = this.tags.split(',');
    arrTags.forEach((tag: string) => {
      const tagElement = document.createElement('a');
      tagElement.href = '#';
      tagElement.className = 'tag';
      tagElement.textContent = tag;
      document.getElementById(this.TAG_ID).append(tagElement);
    });
  }
  
}
