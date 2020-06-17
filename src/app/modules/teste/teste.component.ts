import { Component, OnInit } from '@angular/core';
import { IssuesModel } from '../issues/issues.model';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss'],
})
export class TesteComponent implements OnInit {
  
  public colunasConfig = [
    { nome: 'issues', titulo: 'Issues', cell: (registro: any) => this.getHtml(1, registro), classes: ['make-gold'] },
    { nome: 'post', titulo: 'Post', cell: (registro: any) => `${registro.posts}`, classes: ['info-col'] },
    { nome: 'stars', titulo: 'Stars', cell: (registro: any) => `${registro.stars}`, classes: ['stars-col'] },
    { nome: 'views', titulo: 'Views', cell: (registro: any) => `${registro.views}`, classes: ['views-col'] },
    { nome: 'info', titulo: 'Info', cell: (registro: any) => `${registro.created_at}`, classes: ['post-col'] },
    // author, pic author, dateTime Issue created
  ];
  
  public registros: IssuesModel[];

  constructor() { }
  
  ngOnInit(): void {
    this.registros = [
      {
        id: 1,
        id_user: 12,
        title: 'igor',
        subtitle: 'igor',
        author: 'igor',
        stars: 3,
        views: 223,
        tags: 'igor',
        created_at: 'igor',
        posts: 45,
      }
    ];
  }

  public getHtml(col: number, registro: any) { // continuar daqui dps
    const obj = {
      1: `<div class="iss-content">
      <span class="iss-title">${registro.title}</span>
      <div class="iss-author">@author ${registro.author}</div>
      </div>`
    }

    return obj[col] || undefined;
  }

}
