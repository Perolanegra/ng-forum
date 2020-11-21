import { Component, OnInit } from '@angular/core';
import { IssuesModel } from '../../../models/issues.model';

@Component({
  selector: 'ng-list-issue',
  templateUrl: './list-issue.component.html',
  styleUrls: ['./list-issue.component.scss'],
})
export class ListIssueComponent implements OnInit {

  public colunasConfig = [
    { nome: 'issues', titulo: 'Issues', cell: (registro: IssuesModel) => this.getHtml(1, registro), classes: ['make-gold'] },
    { nome: 'post', titulo: 'Posts', cell: (registro: IssuesModel) => `${registro.posts}`, classes: ['info-col'] },
    { nome: 'stars', titulo: 'Stars', cell: (registro: IssuesModel) => `${registro.stars}`, classes: ['stars-col'] },
    { nome: 'views', titulo: 'Views', cell: (registro: IssuesModel) => `${registro.views}`, classes: ['views-col'] },
    { nome: 'info', titulo: 'Info', cell: (registro: IssuesModel) => this.getHtml(5, registro), classes: ['post-col'] },
    // author, pic author, dateTime Issue created
  ];

  public registros: IssuesModel[];
  private pathFakeImg = '';

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

  ngOnInit(): void {
    this.registros = [
      {
        id: 1,
        id_user: 12,
        title: 'Angular Elements',
        subtitle: 'Gerando conteúdo dinamicamente com angular elements.',
        author: 'igor',
        stars: 3,
        views: 223,
        tags: 'igor',
        created_at: 'igor',
        posts: 45,
      },
      {
        id: 1,
        id_user: 12,
        title: 'Angular Schematics',
        subtitle: 'Gerando components padrões pra sua aplicação.',
        author: 'igor',
        stars: 3,
        views: 223,
        tags: 'igor',
        created_at: 'igor',
        posts: 45,
      },
      {
        id: 1,
        id_user: 12,
        title: 'Interpolação e Property Binding',
        subtitle: 'Iniciando em angular com interpolação e property binding.',
        author: 'igor',
        stars: 3,
        views: 223,
        tags: 'igor',
        created_at: 'igor',
        posts: 45,
      },
      {
        id: 1,
        id_user: 12,
        title: 'Angular Animations',
        subtitle: 'Estilizando sua aplicação com angular animations.',
        author: 'igor',
        stars: 3,
        views: 223,
        tags: 'igor',
        created_at: 'igor',
        posts: 45,
      },

    ];
  }

  public getHtml(col: number, registro: IssuesModel) { // continuar daqui dps
    const obj = {
      1: `<div class="iss-content">
            <span class="iss-title">${registro.title}</span>
            <span class="iss-subtitle">${registro.subtitle.slice(0, 30)}...</span>
            <div class="iss-author">@author ${registro.author}</div>
          </div>`,
      5: `<div class="iss-content iss-content-row">
            <div class="iss-img-out">
              <img src="http://placeimg.com/320/320/people" class="iss-img" />
            </div>
            <div class="iss-info">
              <b>by</b> <span class="iss-info-author">${registro.author}</span>
              <div>${registro.created_at}</div>
            </div>
          </div>`
    }

    return obj[col] || undefined;
  }

}
