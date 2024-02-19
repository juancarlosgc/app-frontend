import { Component, OnInit } from '@angular/core';
import { Mantenimiento } from '../model/mantenimiento';
import { MantenimientoService } from '../services/mantenimiento.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrls: ['./mantenimiento.component.css']
})
export class MantenimientoComponent implements OnInit{

  mantenimientos: Mantenimiento[];
  paginador: any; 

  constructor(private mantenimientoService: MantenimientoService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }
   
     this.mantenimientoService.getMantenimientos(page)
     .pipe(
        tap(response => {
          (response.content as Mantenimiento[]).forEach(mantenimiento => console.log(mantenimiento.nombreMantenimiento));
        })
        ).subscribe(response => {
         this.mantenimientos = response.content as Mantenimiento[];
         this.paginador = response;
       
       }); 
       }
        );
  }

  deleteMantenimiento(mantenimiento: Mantenimiento): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${mantenimiento.nombreMantenimiento} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.mantenimientoService.deleteMantenimiento(mantenimiento.idMantenimiento).subscribe(
          response => {
            this.mantenimientos = this.mantenimientos.filter(per => per !== mantenimiento)
            swal(
              'Mantenimiento Eliminado!',
              `Mantenimiento ${mantenimiento.nombreMantenimiento} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
