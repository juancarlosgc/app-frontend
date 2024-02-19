import { Component, OnInit } from '@angular/core';
import { Persona } from '../model/persona';
import { PersonaService } from '../services/persona.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';



@Component({
  selector: 'app-formpersona',
  templateUrl: './formpersona.component.html',
  styleUrls: ['./formpersona.component.css']
})
export class FormpersonaComponent implements OnInit{
  public persona: Persona = new Persona();
  private titulo: string = 'Formulario de Persona';
  private errores: string[];

  constructor(private personaService: PersonaService,
              private router: Router,
              private activatedRoute: ActivatedRoute){ }

  ngOnInit(): void {
    this.cargarPersona();
  }

  public createPersona(): void {
    this.personaService.createPersona(this.persona)
      .subscribe(response => {
        this.router.navigate(['/persona'])
        swal('Nueva Persona', `Persona ${response.persona.nombres} ${response.persona.apellidos} creada con éxito!`, 'success')
      },
        err => {
          this.errores = err.error.errors as string[];
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }

  cargarPersona(): void {
    this.activatedRoute.params.subscribe(params => {
      let idPersona = params['idPersona'];
      if (idPersona) {
        this.personaService.getPersona(idPersona).subscribe((persona) => this.persona = persona)
      }
    })
  }

  updatePersona(): void{
    this.personaService.updatePersona(this.persona)
    .subscribe (response => {
      this.router.navigate(['/persona'])
      swal('Actualizar Persona', `Persona ${response.persona.nombres} ${response.persona.apellidos} actualizada con éxito!`, 'success')
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
    'CAPITAN', 
    'TENIENTE',
    'SUBTENIENTE', 
    'SARGENTO_PRIMERO', 
    'SARGENTO_SEGUNDO', 
    'CABO_PRIMERO',
    'CABO_SEGUNDO',
  ];

}
