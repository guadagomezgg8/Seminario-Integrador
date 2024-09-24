import { DetalleRol } from "src/entities/detalleRol.entity";

export class CreateComplejoDto {
  nombre:string;
  telefono:string;
  direccion: string;
  localidad: string;
  rangoHorario: string[];
}
