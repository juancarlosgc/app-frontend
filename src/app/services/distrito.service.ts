import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Distrito } from '../model/distrito';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DistritoService {
  public URL: string = 'http://localhost:8080/distritos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(private http: HttpClient, private router:Router) { }

  getDistritos(page: number): Observable<any>{  
    return this.http.get(this.URL + '/vertodo' + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Distrito[]).map(distrito => {
          console.log(this.URL);
          return distrito;
        });
        return response;
      }),
    );
  }

  createDistrito(distrito: Distrito): Observable<any>{
    return this.http.post<any>(this.URL + '/crear', distrito, { headers: this.httpHeaders }).pipe(
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

  getDistrito(idDistrito: number): Observable <Distrito>{
    return this.http.get<Distrito>(this.URL + '/ver/' + idDistrito).pipe(
      catchError(e => {
        this.router.navigate(['/distrito']);
        console.error(e.error.mensaje);
        swal('Error al obtener datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateDistrito(distrito: Distrito): Observable<any> {
    return this.http.put<any>(`${this.URL}/editar/ ${distrito.idDistrito}`,distrito, { headers: this.httpHeaders }).pipe(
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

  
  deleteDistrito(id: number): Observable<Distrito> {
    return this.http.delete<Distrito>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al crear eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


}
