import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Solicitud } from '../model/solicitud';
import { Observable, catchError, throwError } from 'rxjs';
import swal from 'sweetalert2';
import { Persona } from '../model/persona';
import { Vehiculo } from '../model/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  
  public URL: string = 'http://localhost:8080/solicitudes';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  
  constructor(private http: HttpClient, private router:Router) { }


  createSolicitud(solicitud: Solicitud): Observable<any>{
    return this.http.post<any>(this.URL + '/crear', solicitud, { headers: this.httpHeaders }).pipe(
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

  public listPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.URL + '/personas');
  }

  public listVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.URL + '/vehiculos');
  }


}
