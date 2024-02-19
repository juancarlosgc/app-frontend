import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'paginator-persona',
  templateUrl: './paginatorpersona.component.html'

})
export class PaginatorpersonaComponent implements OnInit{
  @Input() paginador: any;
  paginas: number[];
  ngOnInit(): void {
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }
}
