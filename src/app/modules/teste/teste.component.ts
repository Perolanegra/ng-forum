import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teste',
  templateUrl: './teste.component.html',
  styleUrls: ['./teste.component.scss']
})
export class TesteComponent implements OnInit {


  public colunasConfig = [
    { nome: 'nome', titulo: 'Nome', cell: (registro: any) => `igo` },
    { nome: 'siglaFantasia', titulo: 'Sigla Fantasia', cell: (registro: any) => `igo` },
    { nome: 'sigla', titulo: 'Sigla', cell: (registro: any) => `igo` }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
