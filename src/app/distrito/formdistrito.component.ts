import { Component, OnInit } from '@angular/core';
import { Distrito } from '../model/distrito';
import { DistritoService } from '../services/distrito.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formdistrito',
  templateUrl: './formdistrito.component.html',
  styleUrls: ['./formdistrito.component.css']
})
export class FormdistritoComponent implements OnInit{

  public distrito: Distrito = new Distrito();
  private errores: string[];

  constructor(private distritoService: DistritoService,
    private router: Router,
    private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarDistrito();
  }

  public createDistrito(): void {
    this.distritoService.createDistrito(this.distrito)
      .subscribe(response => {
        this.router.navigate(['/distrito'])
        swal('Nuevo Distrito', `Distrito creado con éxito!`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  cargarDistrito(): void {
    this.activatedRoute.params.subscribe(params => {
      let idDistrito = params['idDistrito'];
      if (idDistrito) {
        this.distritoService.getDistrito(idDistrito).subscribe((distrito) => this.distrito = distrito)
      }
    })
  }

  updateDistrito(): void{
    this.distritoService.updateDistrito(this.distrito)
    .subscribe (response => {
      this.router.navigate(['/distrito'])
      swal('Actualizar distrito', `Mantenimiento  actualizado con éxito!`, 'success')
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
    'LOJA', 
    'PICHINCHA',
   
  ];

}
