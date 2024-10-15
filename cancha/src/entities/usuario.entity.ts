import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Localidad } from './localidad.entity';
import { Rol } from './rol.entity';
import { Reserva } from './reserva.entity';
import { Complejo } from './complejo.entity';

@Entity('usuario')
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  contrasena: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @ManyToOne(() => Localidad, (localidad) => localidad.usuarios)
  localidad: Localidad;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  rol: Rol;

  @OneToMany(() => Complejo, (complejo) => complejo.administrador, {
    nullable: true,
  })
  complejos?: Complejo[];

  @OneToMany(() => Reserva, (reserva) => reserva.cliente, { nullable: true })
  reservas?: Reserva[];
}
