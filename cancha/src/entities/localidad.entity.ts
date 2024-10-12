import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './usuario.entity';
import { Complejo } from './complejo.entity';

@Entity('localidad')
export class Localidad extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => Usuario, (usuario) => usuario.localidad)
  usuarios: Usuario[];

  @OneToMany(() => Complejo, (complejo) => complejo.localidad)
  complejos: Complejo[];
}
