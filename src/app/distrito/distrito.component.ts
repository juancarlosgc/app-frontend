import { Component, OnInit } from '@angular/core';
import { Distrito } from '../model/distrito';
import { DistritoService } from '../services/distrito.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.css']
})
export class DistritoComponent implements OnInit{

  distritos: Distrito[];
  paginador: any; 

  constructor(private distritotoService: DistritoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }
   
     this.distritotoService.getDistritos(page)
     .pipe(
        tap(response => {
          (response.content as Distrito[]).forEach(distrito => console.log(distrito.nombreDistrito));
        })
        ).subscribe(response => {
         this.distritos = response.content as Distrito[];
         this.paginador = response;
       
       }); 
       }
        );
  }

  deleteDistrito(distrito: Distrito): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${distrito.nombreDistrito} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.distritotoService.deleteDistrito(distrito.idDistrito).subscribe(
          response => {
            this.distritos = this.distritos.filter(per => per !== distrito)
            swal(
              'Mantenimiento Eliminado!',
              `Mantenimiento ${distrito.nombreDistrito} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
