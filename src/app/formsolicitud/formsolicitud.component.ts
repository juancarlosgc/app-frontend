import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../model/solicitud';
import { Persona } from '../model/persona';
import { Vehiculo } from '../model/vehiculo';
import { SolicitudService } from '../services/solicitud.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formsolicitud',
  templateUrl: './formsolicitud.component.html',
  styleUrls: ['./formsolicitud.component.css']
})
export class FormsolicitudComponent implements OnInit{

  public solicitud: Solicitud = new Solicitud();
  private titulo: string = '';
  private errores: string[];

  personas: Persona[] = [];
  vehiculos: Vehiculo[] = [];

  constructor(private solicitudService: SolicitudService,
    private router: Router,
    private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.solicitudService.listPersonas().subscribe(personas => this.personas = personas);
    this.solicitudService.listVehiculos().subscribe(vehiculos => this.vehiculos = vehiculos);
  }

  
  public createSolicitud(): void {
    this.solicitudService.createSolicitud(this.solicitud)
      .subscribe(response => {
        this.router.navigate(['/home'])
        swal('Nueva Solicitud', `Solicitud ${response.solicitud.idSolicitud} creada con éxito!`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

}
