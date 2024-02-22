import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { RegistroMantenimiento } from '../model/registro-mantenimiento';
import { Solicitud } from '../model/solicitud';
import swal from 'sweetalert2';
import { Mantenimiento } from '../model/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class RegistromantenimientoService {

  public URL: string = 'http://localhost:8080/solicitudes';
  public URLMan: string = 'http://localhost:8080/registros';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient, private router:Router) { }

  getSolicitudes(page: number): Observable<any>{  
    return this.http.get(this.URL + '/vertodo' + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Solicitud[]).map(solicitud => {
          console.log(this.URL);
          return solicitud;
        });
        return response;
      }),
    );
  }

  getSolicitud(idSolicitud: number): Observable <Solicitud>{
    return this.http.get<Solicitud>(this.URL + '/ver/' + idSolicitud).pipe(
      catchError(e => {
        this.router.navigate(['/registro']);
        console.error(e.error.mensaje);
        swal('Error al obtener datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  createRegistroMantenimiento(mantenimiento: RegistroMantenimiento): Observable<any>{
    return this.http.post<any>(this.URLMan + '/crear', mantenimiento, { headers: this.httpHeaders }).pipe(
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

  public listMantenimientos(): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(this.URLMan + '/mantenimientos');
  }
}
