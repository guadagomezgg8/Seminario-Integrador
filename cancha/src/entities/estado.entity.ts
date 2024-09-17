import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Reserva } from "./reserva.entity";

@Entity('estado')
export class Estado extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  ambito: string;

  @Column()
  descripcion: string;

  @OneToMany(()=>Reserva,(reserva)=>reserva.estado)
  reservas: Reserva[];

}