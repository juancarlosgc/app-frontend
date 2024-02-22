import { Component, OnInit } from '@angular/core';
import { RegistroMantenimiento } from '../model/registro-mantenimiento';
import { Mantenimiento } from '../model/mantenimiento';
import { RegistromantenimientoService } from '../services/registromantenimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { Solicitud } from '../model/solicitud';

@Component({
  selector: 'app-formregistromantenimiento',
  templateUrl: './formregistromantenimiento.component.html',
  styleUrls: ['./formregistromantenimiento.component.css']
})
export class FormregistromantenimientoComponent implements OnInit {

  public registromantenimiento: RegistroMantenimiento = new RegistroMantenimiento();
  public solicitud: Solicitud = new Solicitud();

  mantenimientos: Mantenimiento[] = [];
  
  errores: string[];


  constructor(private registroService: RegistromantenimientoService,
    private router: Router,
    private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarRegistro();
    this.registroService.listMantenimientos().subscribe(mantenimientos => this.mantenimientos = mantenimientos);
  }

  public createRegistro(): void {
    this.registroService.createRegistroMantenimiento(this.registromantenimiento)
      .subscribe(response => {
        this.router.navigate(['/'])
        swal('Nuevo Mantenimiento', `Mantenimiento creado con éxito!`, 'success')
      }
      )
  }

  cargarRegistro(): void {
    this.activatedRoute.params.subscribe(params => {
      let idSolicitud = params['idSolicitud'];
      if (idSolicitud) {
        this.registroService.getSolicitud(idSolicitud).subscribe((solicitud) => this.solicitud = solicitud)
      }
    })
  }

}
