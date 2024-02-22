import { Component, OnInit } from '@angular/core';
import { Solicitud } from '../model/solicitud';
import { SolicitudService } from '../services/solicitud.service';
import { ActivatedRoute } from '@angular/router';
import { MantenimientoService } from '../services/mantenimiento.service';
import { RegistromantenimientoService } from '../services/registromantenimiento.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-registromantenimiento',
  templateUrl: './registromantenimiento.component.html',
  styleUrls: ['./registromantenimiento.component.css']
})
export class RegistromantenimientoComponent implements OnInit{
  solicitudes: Solicitud[];
  paginador: any; 

  constructor(private registroService: RegistromantenimientoService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      console.log(page);
      if (!page) {
        page = 0;
      }
   
      this.registroService.getSolicitudes(page)
     .pipe(
        tap(response => {
          (response.content as Solicitud[]).forEach(solicitud => console.log(solicitud.idSolicitud));
        })
        ).subscribe(response => {
         this.solicitudes = response.content as Solicitud[];
         this.paginador = response;
       
       }); 
       }
        );
  }

}
