import { Time } from "@angular/common";
import { Persona } from "./persona";
import { Vehiculo } from "./vehiculo";

export class Solicitud {
    idSolicitud: number;
    fechaSolicitud: string;
    horaSolicitud: string;
    kilometraje: string;
    detalle: string;
    vehiculo: Vehiculo;
    persona: Persona;
    apellidos: string;
    nombres: string;
    marca: string;
    modelo: string;
}
