import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Item } from '../model/item';
import swal from 'sweetalert2';
import { Mantenimiento } from '../model/mantenimiento';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  public URL: string = 'http://localhost:8080/items';
  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router:Router) { }

  
  getItems(page: number): Observable<any>{  
    return this.http.get(this.URL + '/vertodo' + '/page/' + page).pipe(
      map((response: any) => {
        (response.content as Item[]).map(item => {
          console.log(this.URL);
          return item;
        });
        return response;
      }),
    );
  }


  createItem(item: Item): Observable<any>{
    return this.http.post<any>(this.URL + '/crear', item, { headers: this.httpHeaders }).pipe(
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

  getItem(idItem: number): Observable <Item>{
    return this.http.get<Item>(this.URL + '/ver/' + idItem).pipe(
      catchError(e => {
        this.router.navigate(['/item']);
        console.error(e.error.mensaje);
        swal('Error al obtener datos', e.error.mensaje, 'error');
        return throwError(e);
      })
    
    );
  }

  updateItem(item: Item): Observable<any> {
    return this.http.put<any>(`${this.URL}/editar/ ${item.idItem}`,item, { headers: this.httpHeaders }).pipe(
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

  deleteItem(id: number): Observable<Item> {
    return this.http.delete<Item>(`${this.URL}/eliminar/${id}`, { headers: this.httpHeaders }).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal('Error al crear eliminar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  public listMantenimientos(): Observable<Mantenimiento[]> {
    return this.http.get<Mantenimiento[]>(this.URL + '/mantenimientos');
  }

}
