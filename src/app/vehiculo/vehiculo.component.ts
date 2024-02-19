import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../model/vehiculo';
import { VehiculoService } from '../services/vehiculo.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import swal from 'sweetalert2';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent implements OnInit{
 
  vehiculos: Vehiculo[];
  paginador: any; 

  constructor(private vehiculoService: VehiculoService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }
   
     this.vehiculoService.getVehiculos(page)
     .pipe(
        tap(response => {
          (response.content as Vehiculo[]).forEach(vehiculo => console.log(vehiculo.placa));
        })
        ).subscribe(response => {
         this.vehiculos = response.content as Vehiculo[];
         this.paginador = response;
       
       }); 
       }
        );
  }

  deleteVehiculo(vehiculo: Vehiculo): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${vehiculo.marca} ${vehiculo.modelo}?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
      cancelButtonText: 'No, Cancelar!'
    }).then((result) => {
      if (result.value) {
        this.vehiculoService.deleteVehiculo(vehiculo.idVehiculo).subscribe(
          response => {
            this.vehiculos = this.vehiculos.filter(per => per !== vehiculo)
            swal(
              'Vehículo Eliminado!',
              `Vehículo ${vehiculo.marca} ${vehiculo.placa} eliminado con éxito.`,
              'success'
            )
          }
        )
      }
    })
  }

}
