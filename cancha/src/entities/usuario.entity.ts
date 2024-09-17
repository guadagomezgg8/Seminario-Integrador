import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Localidad } from "./localidad.entity";
import { Complejo } from "./complejo.entity";
import { Rol } from "./rol.entity";
import { DetalleRol } from "./detalleRol.entity";
import { Reserva } from "./reserva.entity";

@Entity('usuario')
export class Usuario extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  contraseña: string;

  @Column()
  nombre;

  @Column()
  apellido;

  @Column()
  telefono: string;

  @Column()
  direccion: string;

  @ManyToOne(()=>Localidad,(localidad)=>localidad.usuarios)
  localidad: Localidad;

  @ManyToOne(()=>Rol,(rol)=>rol.usuarios)
  rol: Rol;

  @OneToMany(()=>DetalleRol,(detalleRol)=>detalleRol.usuario)
  complejos: DetalleRol[];

  @OneToMany(()=>Reserva,(reserva)=>reserva.cliente)
  reservas: Reserva[];

}