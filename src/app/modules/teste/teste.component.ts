import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss'],
})
export class TesteComponent implements OnInit {
  widthset = '20px';
  public colunasConfig = [
    { nome: 'issues', titulo: 'Issues', cell: (registro: any) => this.getHtml(1, registro), classes: ['make-gold'] },
    { nome: 'post', titulo: 'Post', cell: (registro: any) => `${registro.sigla}`, classes: ['info-col'] },
    { nome: 'stars', titulo: 'Stars', cell: (registro: any) => `${registro.lastname}`, classes: ['stars-col'] },
    { nome: 'views', titulo: 'Views', cell: (registro: any) => `${registro.lastname}`, classes: ['views-col'] },
    { nome: 'info', titulo: 'Info', cell: (registro: any) => `${registro.lastname}`, classes: ['post-col'] },
    // author, pic author, dateTime Issue created
  ];

  public registros = [
    { nome: 'Igor', sigla: 'IG', lastname: 'Alves', lastRow: false, author: 'perolanegra' },
    { nome: 'Roberto', sigla: 'testesss', lastname: 'Alves', lastRow: false, author: 'perolanegra' },
    { nome: 'Robertinha', sigla: 'teste', lastname: 'Alves', lastRow: true, author: 'perolanegra' },
  ];


  ngOnInit(): void {
  }

  public getHtml(col: number, registro: any) { // continuar daqui dps
    const obj = {
      1: `<div class="iss-content">
      <span class="iss-title">${registro.nome}</span>
      <div class="iss-author">@author ${registro.author}</div>
      </div>`
    }

    return obj[col] || undefined;
  }

}
