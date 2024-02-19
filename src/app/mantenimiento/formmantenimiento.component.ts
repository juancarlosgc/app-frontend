import { Component, OnInit } from '@angular/core';
import { Mantenimiento } from '../model/mantenimiento';
import { MantenimientoService } from '../services/mantenimiento.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formmantenimiento',
  templateUrl: './formmantenimiento.component.html',
  styleUrls: ['./formmantenimiento.component.css']
})
export class FormmantenimientoComponent implements OnInit{

  public mantenimiento: Mantenimiento = new Mantenimiento();
  private titulo: string = 'Formulario de Mantenimientos';
  private errores: string[];

  constructor(private mantenimientoService: MantenimientoService,
    private router: Router,
    private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarMantenimiento();
  }

  public createMantenimiento(): void {
    this.mantenimientoService.createMantenimiento(this.mantenimiento)
      .subscribe(response => {
        this.router.navigate(['/mantenimiento'])
        swal('Nuevo Mantenimiento', `mantenimiento  creado con éxito!`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  cargarMantenimiento(): void {
    this.activatedRoute.params.subscribe(params => {
      let idMantenimiento = params['idMantenimiento'];
      if (idMantenimiento) {
        this.mantenimientoService.getMantenimiento(idMantenimiento).subscribe((mantenimiento) => this.mantenimiento = mantenimiento)
      }
    })
  }

  updateMantenimiento(): void{
    this.mantenimientoService.updateMantenimiento(this.mantenimiento)
    .subscribe (response => {
      this.router.navigate(['/mantenimiento'])
      swal('Actualizar mantenimiento', `Mantenimiento  actualizado con éxito!`, 'success')
       },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
    )
  }

}
