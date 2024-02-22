import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Subcircuito } from '../model/subcircuito';
import swal from 'sweetalert2';
import { Circuito } from '../model/circuito';

@Injectable({
  providedIn: 'root'
})
export class SubcircuitoService {
  public URL: string = 'http://localhost:8080/subcircuitos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router:Router) { }

  getSubcircuitos(page: number): Observable<any>{  
    return this.http.get(this.URL + '/vertodo' + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Subcircuito[]).map(item => {
          console.log(this.URL);
          return item;
        });
        return response;
      }),
    );
  }

  createSubcircuito(subcircuito: Subcircuito): Observable<any>{
    return this.http.post<any>(this.URL + '/crear', subcircuito, { headers: this.httpHeaders }).pipe(
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

  getSubcircuito(idSubcircuito: number): Observable <Subcircuito>{
    return this.http.get<Subcircuito>(this.URL + '/ver/' + idSubcircuito).pipe(
      catchError(e => {
        this.router.navigate(['/subcircuito']);
        console.error(e.error.mensaje);
        swal('Error al obtener datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    
    );
  }

  updateSubcircuito(subcircuito: Subcircuito): Observable<any> {
    return this.http.put<any>(`${this.URL}/editar/ ${subcircuito.idSubcircuito}`,subcircuito, { headers: this.httpHeaders }).pipe(
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


  deleteSubcircuito(id: number): Observable<Subcircuito> {
    return this.http.delete<Subcircuito>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  public listCircuitos(): Observable<Circuito[]> {
    return this.http.get<Circuito[]>(this.URL + '/circuitos');
  }


}
