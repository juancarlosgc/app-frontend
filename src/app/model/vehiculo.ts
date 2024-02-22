import { Subcircuito } from "./subcircuito";

export class Vehiculo {
    idVehiculo: number;
    placa: string;
    chasis: string;
    marca: string;
    modelo: string;
    motor: string;
    kilometraje: number;
    cilindraje: number;
    capacidadCarga: number;
    cantidadPasajeros: number;
    tipoVehiculo: string;
    observaciones: string;
    subcircuito: Subcircuito;
}
