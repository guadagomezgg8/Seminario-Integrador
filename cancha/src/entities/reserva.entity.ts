import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cancha } from './cancha.entity';
import { Usuario } from './usuario.entity';
import { Estado } from './estado.entity';

@Entity('reserva')
export class Reserva extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fecha: string;

  @Column()
  horaInicio: string;

  @Column()
  horaFin: string;

  @ManyToOne(() => Cancha, (cancha) => cancha.reservas)
  cancha: Cancha;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas)
  cliente: Usuario;

  @ManyToOne(() => Estado, (estado) => estado.reservas)
  estado: Estado;
}
