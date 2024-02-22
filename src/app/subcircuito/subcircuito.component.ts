import { Component, OnInit } from '@angular/core';
import { Subcircuito } from '../model/subcircuito';
import { SubcircuitoService } from '../services/subcircuito.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-subcircuito',
  templateUrl: './subcircuito.component.html',
  styleUrls: ['./subcircuito.component.css']
})
export class SubcircuitoComponent implements OnInit{

  
  subcircuitos: Subcircuito[];
  paginador: any; 

  constructor(private subcircuitoService: SubcircuitoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }
   
     this.subcircuitoService.getSubcircuitos(page)
     .pipe(
        tap(response => {
          (response.content as Subcircuito[]).forEach(subcircuito => console.log(subcircuito.nombreSubcircuito));
        })
        ).subscribe(response => {
         this.subcircuitos = response.content as Subcircuito[];
         this.paginador = response;
       
       }); 
       }
        );
  }

  deleteCircuito(subcircuito: Subcircuito): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${subcircuito.nombreSubcircuito} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.subcircuitoService.deleteSubcircuito(subcircuito.idSubcircuito).subscribe(
          response => {
            this.subcircuitos = this.subcircuitos.filter(per => per !== subcircuito)
            swal(
              'Ítem Eliminado!',
              `Ítem ${subcircuito.nombreSubcircuito} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
