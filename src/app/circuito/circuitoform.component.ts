import { Component, OnInit } from '@angular/core';
import { Circuito } from '../model/circuito';
import { CircuitoService } from '../services/circuito.service';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import swal from 'sweetalert2';
import { Distrito } from '../model/distrito';

@Component({
  selector: 'app-circuitoform',
  templateUrl: './circuitoform.component.html',
  styleUrls: ['./circuitoform.component.css']
})
export class CircuitoformComponent implements OnInit{

  public circuito: Circuito = new Circuito();
  distritos: Distrito[] = [];
  private titulo: string = 'Formulario de items';
  private errores: string[];

  constructor(private circuitoService: CircuitoService,
    private router: Router,
    private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarCircuito();
    this.circuitoService.listDistritos().subscribe(distritos => this.distritos = distritos);
  
  }

  public createCircuito(): void {
    this.circuitoService.createCircuito(this.circuito)
      .subscribe(response => {
        this.router.navigate(['/circuito'])
        swal('Nuevo Circuito', `Circuito creado con éxito!`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  cargarCircuito(): void {
    this.activatedRoute.params.subscribe(params => {
      let idCircuito = params['idCircuito'];
      if (idCircuito) {
        this.circuitoService.getCircuito(idCircuito).subscribe((circuito) => this.circuito = circuito)
      }
    })
  }

  updateCircuito(): void{
    this.circuitoService.updateCircuito(this.circuito)
    .subscribe (response => {
      this.router.navigate(['/circuito'])
      swal('Actualizar Circuito', `Circuito actualizado con éxito!`, 'success')
       },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);

        }
    )
  }

}
