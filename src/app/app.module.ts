import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { PersonaComponent } from './persona/persona.component';
import { RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormpersonaComponent } from './persona/formpersona.component';
import { FormsModule } from '@angular/forms';

import { PaginatorpersonaComponent } from './paginator/paginatorpersona.component';
import { VehiculoComponent } from './vehiculo/vehiculo.component';

import { FormvehiculoComponent } from './vehiculo/formvehiculo.component';
import { PaginatorvehiculoComponent } from './paginator/paginatorvehiculo.component';

import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { FormmantenimientoComponent } from './mantenimiento/formmantenimiento.component';
import { PaginatormantenimientoComponent } from './paginator/paginatormantenimiento.component';
import { ItemComponent } from './item/item.component';
import { FormitemComponent } from './item/formitem.component';
import { DistritoComponent } from './distrito/distrito.component';
import { FormdistritoComponent } from './distrito/formdistrito.component';
import { CircuitoComponent } from './circuito/circuito.component';
import { CircuitoformComponent } from './circuito/circuitoform.component';
import { SubcircuitoComponent } from './subcircuito/subcircuito.component';
import { FormsubcircuitoComponent } from './subcircuito/formsubcircuito.component';
import { FormsolicitudComponent } from './formsolicitud/formsolicitud.component';
import { RegistromantenimientoComponent } from './registromantenimiento/registromantenimiento.component';
import { FormregistromantenimientoComponent } from './registromantenimiento/formregistromantenimiento.component';



const routes: Routes = [
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: 'persona', component: PersonaComponent},
  {path: 'persona/page/:page', component: PersonaComponent},
  {path: 'persona/formpersona', component: FormpersonaComponent},
  {path: 'persona/formpersona/:idPersona', component: FormpersonaComponent},

  {path: 'vehiculo', component: VehiculoComponent},
  {path: 'vehiculo/page/:page', component: VehiculoComponent},
  {path: 'vehiculo/formvehiculo', component: FormvehiculoComponent},
  {path: 'vehiculo/formvehiculo/:idVehiculo', component: FormvehiculoComponent},

  {path: 'mantenimiento', component: MantenimientoComponent},
  {path: 'mantenimiento/page/:page', component: MantenimientoComponent},
  {path: 'mantenimiento/formmantenimiento', component: FormmantenimientoComponent},
  {path: 'mantenimiento/formmantenimiento/:idMantenimiento', component: FormmantenimientoComponent},

  {path: 'item', component: ItemComponent},
  {path: 'item/page/:page', component: ItemComponent},
  {path: 'item/formitem', component: FormitemComponent},
  {path: 'item/formitem/:idItem', component: FormitemComponent},

  {path: 'distrito', component: DistritoComponent},
  {path: 'distrito/page/:page', component: DistritoComponent},
  {path: 'distrito/formdistrito', component: FormdistritoComponent},
  {path: 'distrito/formdistrito/:idDistrito', component: FormdistritoComponent},

  {path: 'circuito', component: CircuitoComponent},
  {path: 'circuito/page/:page', component: CircuitoComponent},
  {path: 'circuito/formcircuito', component: CircuitoformComponent},
  {path: 'circuito/formcircuito/:idCircuito', component: CircuitoformComponent},

  {path: 'subcircuito', component: SubcircuitoComponent},
  {path: 'subcircuito/page/:page', component: SubcircuitoComponent},
  {path: 'subcircuito/formsubcircuito', component: FormsubcircuitoComponent},
  {path: 'subcircuito/formsubcircuito/:idSubcircuito', component: FormsubcircuitoComponent},

  {path: 'solicitud', component: FormsolicitudComponent},

  {path: 'registro', component: RegistromantenimientoComponent},
  {path: 'registro/page/:page', component: SubcircuitoComponent},
  {path: 'registro/formregistromantenimiento', component: FormregistromantenimientoComponent},
  {path: 'registro/formregistromantenimiento/:idSolicitud', component: FormregistromantenimientoComponent},
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PersonaComponent,
    FormpersonaComponent,
    PaginatorpersonaComponent,
    VehiculoComponent,
    FormvehiculoComponent,
    PaginatorvehiculoComponent,
    MantenimientoComponent,
    FormmantenimientoComponent,
    PaginatormantenimientoComponent,
    ItemComponent,
    FormitemComponent,
    DistritoComponent,
    FormdistritoComponent,
    CircuitoComponent,
    CircuitoformComponent,
    SubcircuitoComponent,
    FormsubcircuitoComponent,
    FormsolicitudComponent,
    RegistromantenimientoComponent,
    FormregistromantenimientoComponent


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
