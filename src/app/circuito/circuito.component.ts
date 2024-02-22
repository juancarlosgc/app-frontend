import { Component, OnInit } from '@angular/core';
import { Circuito } from '../model/circuito';
import { CircuitoService } from '../services/circuito.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-circuito',
  templateUrl: './circuito.component.html',
  styleUrls: ['./circuito.component.css']
})
export class CircuitoComponent implements OnInit{


  circuitos: Circuito[];
  paginador: any; 

  constructor(private circuitoService: CircuitoService, private activatedRoute: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }
   
     this.circuitoService.getCircuitos(page)
     .pipe(
        tap(response => {
          (response.content as Circuito[]).forEach(circuito => console.log(circuito.nombreCircuito));
        })
        ).subscribe(response => {
         this.circuitos = response.content as Circuito[];
         this.paginador = response;
       
       }); 
       }
        );
  }

  deleteCircuito(circuito: Circuito): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${circuito.nombreCircuito} ?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.circuitoService.deleteCircuito(circuito.idCircuito).subscribe(
          response => {
            this.circuitos = this.circuitos.filter(per => per !== circuito)
            swal(
              'Ítem Eliminado!',
              `Ítem ${circuito.nombreCircuito} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
