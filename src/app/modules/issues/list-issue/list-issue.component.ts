import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { IssuesModel } from '../../../models/issues.model';

@Component({
  selector: 'ng-list-issue',
  templateUrl: './list-issue.component.html',
  styleUrls: ['./list-issue.component.scss'],
})
export class ListIssueComponent implements OnInit {

  public colunasConfig = [
    { name: 'issues', title: 'Issues', cell: (data: IssuesModel) => this.getHtml(1, data), classes: ['make-gold'] },
    { name: 'post', title: 'Posts', cell: (data: IssuesModel) => this.getHtml(2, data), classes: ['info-col'] },
    { name: 'stars', title: 'Stars', cell: (data: IssuesModel) => this.getHtml(3, data), classes: ['stars-col'] },
    { name: 'views', title: 'Views', cell: (data: IssuesModel) => this.getHtml(4, data), classes: ['views-col'] },
    { name: 'info', title: 'Info', cell: (data: IssuesModel) => this.getHtml(5, data), classes: ['post-col'] },
    // author, pic author, dateTime Issue created
  ];

  public rowSkeletonTheme = {
    'height': '70px',
    'width': '55vw',
    'background-color': '#E91E63',
    'animation-duration': '2s',
    'opacity': '0.7'
  };

  public titleSkeletonTheme = {
    'height': '70px',
    'width': '60vw',
    'background-color': '#E91E63',
    'animation-duration': '2s',
    'opacity': '0.7'
  };

  public registros: IssuesModel[] = [
    {
      id: 1,
      id_user: 12,
      title: 'Angular Elements',
      subtitle: 'teste',
      author: 'igor',
      stars: 14,
      views: 223,
      tags: 'igor',
      created_at: 'igor',
      posts: 45,
      pplVoted: 3
    },
    {
      id: 1,
      id_user: 12,
      title: 'Angular Schematics',
      subtitle: 'Gerando components padrões pra sua aplicação.',
      author: 'igor',
      stars: 14,
      views: 223,
      tags: 'igor',
      created_at: 'igor',
      posts: 45,
      pplVoted: 3
    },
    {
      id: 1,
      id_user: 12,
      title: 'Interpolação e Property Binding',
      subtitle: 'Iniciando em angular com interpolação e property binding.',
      author: 'igor',
      stars: 14,
      views: 223,
      tags: 'igor',
      created_at: 'igor',
      posts: 45,
      pplVoted: 3
    },
    {
      id: 1,
      id_user: 12,
      title: 'Angular Animations',
      subtitle: 'Estilizando sua aplicação com angular animations.',
      author: 'igor',
      stars: 14,
      views: 223,
      tags: 'igor',
      created_at: 'igor',
      posts: 45,
      pplVoted: 3
    },
    {
      id: 1,
      id_user: 12,
      title: 'Angular Animations',
      subtitle: 'Estilizando sua aplicação com angular animations.',
      author: 'igor',
      stars: 14,
      views: 223,
      tags: 'igor',
      created_at: 'igor',
      posts: 45,
      pplVoted: 3
    },
    {
      id: 1,
      id_user: 12,
      title: 'Angular Animations',
      subtitle: 'Estilizando sua aplicação com angular animations.',
      author: 'igor',
      stars: 14,
      views: 223,
      tags: 'igor',
      created_at: 'igor',
      posts: 45,
      pplVoted: 3
    },
    {
      id: 1,
      id_user: 12,
      title: 'Angular Animations',
      subtitle: 'Estilizando sua aplicação com angular animations.',
      author: 'igor',
      stars: 14,
      views: 223,
      tags: 'igor',
      created_at: 'igor',
      posts: 45,
      pplVoted: 3
    },

  ];
  ngOnInit(): void {
  }

  public getHtml(col: number, data: IssuesModel): string { // TODO: Completar o html das colunas restantes.
    const obj = {
      1: `<div class="iss-content">
            <span class="iss-title">${data.title}</span>
            <span class="iss-subtitle">${data.subtitle}</span>
            <div class="iss-author">@author ${data.author}</div>
          </div>`,
      2: `<div class="iss-content iss-content-row">
            <span class="iss-posts">${data.posts}</span>
          </div>`,
      3: `<div class="iss-content iss-content-row">
            <span class="iss-stars-out">${col === 3 ? this.countStars(data) : ''}</span>
            <span class="iss-stars-average">${(data.stars / data.pplVoted).toFixed(1)}</span>
          </div>`,
      4: `<div class="iss-content iss-content-row">
            <span class="iss-views">${data.views}</span>
          </div>`,
      5: `<div class="iss-content iss-content-row">
            <div class="iss-img-out">
              <img src="http://placeimg.com/320/320/people" class="iss-img" />
            </div>
            <div class="iss-info">
              <b>by</b> <span class="iss-info-author">${data.author}</span>
              <div>${data.created_at}</div>
            </div>
          </div>`
    };

    return obj[col] || undefined;
  }

  public countStars(data: IssuesModel): string {
    const svg: HTMLElement = document.createElement("svg");
    svg.innerHTML = `
      <svg width="15" height="15" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <path class="iss-stars"
          d="M5.483.314l1.128 2.39a.54.54 0 0 0 .405.308l2.522.383c.442.067.618.635.299.96l-1.825 1.86a.58.58 0 0 0-.155.499l.43 2.626c.076.46-.386.811-.78.594L5.25 8.694a.518.518 0 0 0-.502 0l-2.255 1.24c-.395.217-.857-.134-.782-.594l.431-2.626a.58.58 0 0 0-.155-.499L.163 4.355c-.32-.326-.143-.893.299-.96l2.522-.383a.54.54 0 0 0 .405-.308L4.517.314a.528.528 0 0 1 .966 0z">
        </path>
      </svg>`;

    const average = data.stars / data.pplVoted;
    let htmlSVG = '';

    for (let i = 0; i < parseInt(average.toString()); i++) htmlSVG = htmlSVG.concat(svg.innerHTML);

    return htmlSVG;
  }

}
