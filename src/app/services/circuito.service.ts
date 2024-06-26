import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Circuito } from '../model/circuito';
import swal from 'sweetalert2';
import { Distrito } from '../model/distrito';

@Injectable({
  providedIn: 'root'
})
export class CircuitoService {
  public URL: string = 'http://localhost:8080/circuitos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router:Router) { }

  getCircuitos(page: number): Observable<any>{  
    return this.http.get(this.URL + '/vertodo' + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Circuito[]).map(item => {
          console.log(this.URL);
          return item;
        });
        return response;
      }),
    );
  }

  createCircuito(circuito: Circuito): Observable<any>{
    return this.http.post<any>(this.URL + '/crear', circuito, { headers: this.httpHeaders }).pipe(
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

  
  getCircuito(idCircuito: number): Observable <Circuito>{
    return this.http.get<Circuito>(this.URL + '/ver/' + idCircuito).pipe(
      catchError(e => {
        this.router.navigate(['/circuito']);
        console.error(e.error.mensaje);
        swal('Error al obtener datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    
    );
  }

  updateCircuito(circuito: Circuito): Observable<any> {
    return this.http.put<any>(`${this.URL}/editar/ ${circuito.idCircuito}`,circuito, { headers: this.httpHeaders }).pipe(
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

  deleteCircuito(id: number): Observable<Circuito> {
    return this.http.delete<Circuito>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al  eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  public listDistritos(): Observable<Distrito[]> {
    return this.http.get<Distrito[]>(this.URL + '/distritos');
  }

}
