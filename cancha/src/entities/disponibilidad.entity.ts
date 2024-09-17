import { BaseEntity, Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Cancha } from "./cancha.entity";

@Entity('disponibilidad')
export class Disponibilidad extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: Date;

  @Column()
  horaInicio: string;

  @Column()
  horaFin: string;

  @ManyToMany(()=>Cancha,(cancha)=>cancha.disponibilidades)
  canchas: Cancha[];

}