import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Persona } from '../model/persona';
import { Observable, catchError, map, throwError, tap } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subcircuito } from '../model/subcircuito';
import { Vehiculo } from '../model/vehiculo';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  public URL: string = 'http://localhost:8080/personas';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(private http: HttpClient, private router:Router) { }

  getPersonas(page: number): Observable<any>{  
    return this.http.get(this.URL + '/vertodo' + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Persona[]).map(persona => {
          console.log(this.URL);
          return persona;
        });
        return response;
      }),
    );
  }

  createPersona(persona: Persona): Observable<any>{
    return this.http.post<any>(this.URL + '/crear', persona, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal('Error al crear registro', e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getPersona(idPersona: number): Observable <Persona>{
    return this.http.get<Persona>(this.URL + '/ver/' + idPersona).pipe(
      catchError(e => {
        this.router.navigate(['/persona']);
        console.error(e.error.mensaje);
        swal('Error al obtener datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    
    );
  }

  updatePersona(persona: Persona): Observable<any> {
    return this.http.put<any>(`${this.URL}/editar/ ${persona.idPersona}`,persona, { headers: this.httpHeaders }).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal('Error al actualizar registro', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  deletePersona(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al crear eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  public listSubcircuitos(): Observable<Subcircuito[]> {
    return this.http.get<Subcircuito[]>(this.URL + '/subcircuitos');
  }

  public listVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.URL + '/vehiculos');
  }


}
