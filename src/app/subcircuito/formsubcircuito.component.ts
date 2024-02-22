import { Component, OnInit } from '@angular/core';
import { Subcircuito } from '../model/subcircuito';
import { Circuito } from '../model/circuito';
import { SubcircuitoService } from '../services/subcircuito.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-formsubcircuito',
  templateUrl: './formsubcircuito.component.html',
  styleUrls: ['./formsubcircuito.component.css']
})
export class FormsubcircuitoComponent implements OnInit{

  public subcircuito: Subcircuito = new Subcircuito();
  circuitos: Circuito[] = [];
  private titulo: string = 'Formulario de items';
  private errores: string[];

  constructor(private subcircuitoService: SubcircuitoService,
    private router: Router,
    private activatedRoute: ActivatedRoute){ }


  ngOnInit(): void {
 
    this.cargarSubcircuito();
    this.subcircuitoService.listCircuitos().subscribe(circuitos => this.circuitos = circuitos);
  }

  public createSubcircuito(): void {
    this.subcircuitoService.createSubcircuito(this.subcircuito)
      .subscribe(response => {
        this.router.navigate(['/subcircuito'])
        swal('Nuevo Subcircuito', `Subcircuito creado con éxito!`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  cargarSubcircuito(): void {
    this.activatedRoute.params.subscribe(params => {
      let idSubcircuito = params['idSubcircuito'];
      if (idSubcircuito) {
        this.subcircuitoService.getSubcircuito(idSubcircuito).subscribe((subcircuito) => this.subcircuito = subcircuito)
      }
    })
  }

  updateSubcircuito(): void{
    this.subcircuitoService.updateSubcircuito(this.subcircuito)
    .subscribe (response => {
      this.router.navigate(['/subcircuito'])
      swal('Actualizar Subcircuito', `Subcircuito actualizado con éxito!`, 'success')
       },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);

        }
    )
  }

}
