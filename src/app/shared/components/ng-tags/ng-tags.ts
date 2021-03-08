import { AppController } from 'src/app/core/appController';

export class NgTags {
  readonly TAG_ID = "ng_tag_element";

  private tags: string;
  private appController: AppController;
  private colors: string;

  constructor(tags: string, appController: AppController, colors: string) {
    this.tags = tags;
    this.appController = appController;
    this.colors = colors;
  }

  createTagElement(): string {
    const arrColors = this.colors.split(",");
    const arrTags = this.tags.split(",");
    let innerHTML: string = "";
    arrTags.forEach((tag: string, index: number) => {
      const tagElement = document.createElement("a");
      tagElement.href = "#";
      tagElement.className = `tag ${index.toString()}`;
      tagElement.textContent = tag;
      tagElement.style.background = arrColors[index];
      tagElement.style.borderLeftColor = arrColors[index];
      innerHTML = innerHTML.concat(tagElement.outerHTML);
    });

    return innerHTML;
  }
}
