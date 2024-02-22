import { Subcircuito } from "./subcircuito";
import { Vehiculo } from "./vehiculo";

export class Persona {
    idPersona: number;
    cedula: string;
    apellidos: string;
    nombres: string;
    fechaNacimiento: string;
    tipoSangre: string;
    ciudadNacimiento: string;
    telefono: string;
    rango: string;
    subcircuito: Subcircuito;
    vehiculo: Vehiculo;
}