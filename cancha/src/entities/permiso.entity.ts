import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Rol } from "./rol.entity";

@Entity('permiso')
export class Permiso extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @ManyToMany(()=>Rol,(rol)=>rol.permisos)
  roles: Rol[];

}