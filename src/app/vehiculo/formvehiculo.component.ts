import { Component, OnInit } from '@angular/core';
import { Vehiculo } from '../model/vehiculo';
import { VehiculoService } from '../services/vehiculo.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Subcircuito } from '../model/subcircuito';

@Component({
  selector: 'app-formvehiculo',
  templateUrl: './formvehiculo.component.html',
  styleUrls: ['./formvehiculo.component.css']
})
export class FormvehiculoComponent implements OnInit{

  public vehiculo: Vehiculo = new Vehiculo();
  private titulo: string = 'Formulario de vehiculos';
  private errores: string[];
  subcircuitos: Subcircuito[] = [];

  constructor(private vehiculoService: VehiculoService,
              private router: Router,
              private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarVehiculo();
    this.vehiculoService.listSubcircuitos().subscribe(subcircuitos => this.subcircuitos = subcircuitos);
  }

  public createVehiculo(): void {
    this.vehiculoService.createVehiculo(this.vehiculo)
      .subscribe(response => {
        this.router.navigate(['/vehiculo'])
        swal('Nuevo Vehículo', `vehículo ${response.vehiculo.placa} ${response.vehiculo.marca} creado con éxito!`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  cargarVehiculo(): void {
    this.activatedRoute.params.subscribe(params => {
      let idVehiculo = params['idVehiculo'];
      if (idVehiculo) {
        this.vehiculoService.getVehiculo(idVehiculo).subscribe((vehiculo) => this.vehiculo = vehiculo)
      }
    })
  }

  updateVehiculo(): void{
    this.vehiculoService.updateVehiculo(this.vehiculo)
    .subscribe (response => {
      this.router.navigate(['/vehiculo'])
      swal('Actualizar Vehículo', `Vehículo ${response.vehiculo.placa} ${response.vehiculo.marca} actualizado con éxito!`, 'success')
       },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
    )
  }

  opcionSeleccionada: string; 
  opciones = [
    'AUTOMOVIL', 
    'MOTOCICLETA',
    'CAMIONETA'
  ];

}
