import { Mantenimiento } from "./mantenimiento";
import { Persona } from "./persona";
import { Solicitud } from "./solicitud";
import { Vehiculo } from "./vehiculo";

export class RegistroMantenimiento {
    idRegistro: number;
    fechaIngreso: string;
    horaIngreso:string;
    solicitud: Solicitud;
    mantenimiento: Mantenimiento;
     
}
