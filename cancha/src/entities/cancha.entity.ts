import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DetalleRol } from "./detalleRol.entity";
import { Complejo } from "./complejo.entity";
import { Disponibilidad } from "./disponibilidad.entity";
import { Reserva } from "./reserva.entity";

@Entity('cancha')
export class Cancha extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  tipo: string;

  @Column()
  descripcion: string;

  @Column()
  precio: number;

  @OneToMany(()=>DetalleRol,(detalleRol)=>detalleRol.cancha)
  detallesRol: DetalleRol[];

  @ManyToOne(()=>Complejo,(complejo)=>complejo.canchas)
  complejo: Complejo;

  @ManyToMany(()=>Disponibilidad,(disponibilidad)=>disponibilidad.canchas)
  disponibilidades: Disponibilidad[];

  @OneToMany(()=>Reserva,(reserva)=>reserva.cancha)
  reservas: Reserva[];

}