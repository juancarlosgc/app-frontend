import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Vehiculo } from '../model/vehiculo';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  public URL: string = 'http://localhost:8080/vehiculos';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router:Router) { }

  getVehiculos(page: number): Observable<any>{  
    return this.http.get(this.URL + '/vertodo' + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Vehiculo[]).map(vehiculo => {
          console.log(this.URL);
          return vehiculo;
        });
        return response;
      }),
    );
  }

  createVehiculo(vehiculo: Vehiculo): Observable<any>{
    return this.http.post<any>(this.URL + '/crear', vehiculo, { headers: this.httpHeaders }).pipe(
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

  getVehiculo(idVehiculo: number): Observable <Vehiculo>{
    return this.http.get<Vehiculo>(this.URL + '/ver/' + idVehiculo).pipe(
      catchError(e => {
        this.router.navigate(['/vehiculo']);
        console.error(e.error.mensaje);
        swal('Error al obtener datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    
    );
  }

  updateVehiculo(vehiculo: Vehiculo): Observable<any> {
    return this.http.put<any>(`${this.URL}/editar/ ${vehiculo.idVehiculo}`,vehiculo, { headers: this.httpHeaders }).pipe(
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

  deleteVehiculo(id: number): Observable<Vehiculo> {
    return this.http.delete<Vehiculo>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al crear eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }



}
