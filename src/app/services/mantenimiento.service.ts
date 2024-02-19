import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Mantenimiento } from '../model/mantenimiento';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MantenimientoService {

  public URL: string = 'http://localhost:8080/mantenimientos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient, private router:Router) { }

  getMantenimientos(page: number): Observable<any>{  
    return this.http.get(this.URL + '/vertodo' + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Mantenimiento[]).map(mantenimiento => {
          console.log(this.URL);
          return mantenimiento;
        });
        return response;
      }),
    );
  }

  createMantenimiento(mantenimiento: Mantenimiento): Observable<any>{
    return this.http.post<any>(this.URL + '/crear', mantenimiento, { headers: this.httpHeaders }).pipe(
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

  getMantenimiento(idMantenimiento: number): Observable <Mantenimiento>{
    return this.http.get<Mantenimiento>(this.URL + '/ver/' + idMantenimiento).pipe(
      catchError(e => {
        this.router.navigate(['/mantenimiento']);
        console.error(e.error.mensaje);
        swal('Error al obtener datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  updateMantenimiento(mantenimiento: Mantenimiento): Observable<any> {
    return this.http.put<any>(`${this.URL}/editar/ ${mantenimiento.idMantenimiento}`,mantenimiento, { headers: this.httpHeaders }).pipe(
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

  deleteMantenimiento(id: number): Observable<Mantenimiento> {
    return this.http.delete<Mantenimiento>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al crear eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


}
