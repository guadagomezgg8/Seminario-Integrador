import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from "typeorm";
import { Usuario } from "./usuario.entity";
import { Permiso } from "./permiso.entity";
import { DetalleRol } from "./detalleRol.entity";

@Entity('rol')
export class Rol extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(()=>Permiso,(permiso)=>permiso.roles)
  permisos: Permiso[];

  @OneToMany(()=>Usuario,(usuario)=>usuario.rol)
  usuarios: Usuario[];

  @OneToMany(()=>DetalleRol,(detalleRol)=>detalleRol.rol)
  detallesRol: DetalleRol[];

}