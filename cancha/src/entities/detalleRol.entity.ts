import { Entity, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Cancha } from "./cancha.entity";
import { Complejo } from "./complejo.entity";
import { Rol } from "./rol.entity";
import { Usuario } from "./usuario.entity";

@Entity('detalleRol')
export class DetalleRol extends BaseEntity {
  
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(()=>Cancha,(cancha)=>cancha.detallesRol)
  cancha: Cancha;

  @ManyToOne(()=>Complejo,(complejo)=>complejo.detallesRol)
  complejo: Complejo;

  @ManyToOne(()=>Rol,(rol)=>rol.detallesRol)
  rol: Rol;

  @ManyToOne(()=>Usuario,(usuario)=>usuario.complejos)
  usuario: Usuario;

}