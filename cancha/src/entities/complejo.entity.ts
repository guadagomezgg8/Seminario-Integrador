import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cancha } from './cancha.entity';
import { Localidad } from './localidad.entity';
import { Usuario } from './usuario.entity';

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

  @ManyToOne(() => Localidad, (localidad) => localidad.complejos)
  localidad: Localidad;

  @Column()
  rangoHorario: string;

  @OneToMany(() => Usuario, (usuario) => usuario.complejos)
  administrador: Usuario[];

  @OneToMany(() => Cancha, (cancha) => cancha.complejo)
  canchas: Cancha[];
}
