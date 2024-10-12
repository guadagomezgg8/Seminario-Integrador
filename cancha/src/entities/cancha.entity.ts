import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Complejo } from './complejo.entity';
import { Disponibilidad } from './disponibilidad.entity';
import { Reserva } from './reserva.entity';

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

  @ManyToOne(() => Complejo, (complejo) => complejo.canchas)
  complejo: Complejo;

  @JoinTable()
  @ManyToMany(() => Disponibilidad, (disponibilidad) => disponibilidad.canchas)
  disponibilidades: Disponibilidad[];

  @OneToMany(() => Reserva, (reserva) => reserva.cancha)
  reservas: Reserva[];
}
