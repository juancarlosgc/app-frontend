import { Component } from '@angular/core';
import { Persona } from '../model/persona';
import { PersonaService } from '../services/persona.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
tap

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent {
  personas: Persona[];
  paginador: any; 

  constructor(private personaService: PersonaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }
   
     this.personaService.getPersonas(page)
     .pipe(
        tap(response => {
          (response.content as Persona[]).forEach(persona => console.log(persona.nombres));
        })
        ).subscribe(response => {
         this.personas = response.content as Persona[];
         this.paginador = response;
       
       }); 
       }
        );
  }

  
 deletePersona(persona: Persona): void {
  swal({
    title: 'Está seguro?',
    text: `¿Seguro que desea eliminar a ${persona.nombres} ${persona.apellidos}?`,
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Si, Eliminar!',
    cancelButtonText: 'No, Cancelar!'
  }).then((result) => {
    if (result.value) {
      this.personaService.deletePersona(persona.idPersona).subscribe(
        response => {
          this.personas = this.personas.filter(per => per !== persona)
          swal(
            'Persona Eliminada!',
            `Persona ${persona.nombres} ${persona.apellidos} eliminada con éxito.`,
            'success'
          )
        }
      )
    }
  })
}


}
