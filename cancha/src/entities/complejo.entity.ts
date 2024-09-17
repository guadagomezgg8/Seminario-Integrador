import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleRol } from "./detalleRol.entity";
import { Cancha } from "./cancha.entity";
import { Localidad } from "./localidad.entity";

@Entity('complejo')
export class Complejo extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @ManyToOne(()=>Localidad,(localidad)=>localidad.complejos)
  localidad: Localidad[];

  @Column()
  rangoHorario: string[];

  @OneToMany(()=>DetalleRol,(detalleRol)=>detalleRol.complejo)
  detallesRol: DetalleRol[];

  @OneToMany(()=>Cancha,(cancha)=>cancha.complejo)
  canchas: Cancha[];

}