import { Injectable } from '@nestjs/common';
import { CreateDetalleRolDto } from './dto/create-detalle-rol.dto';
import { UpdateDetalleRolDto } from './dto/update-detalle-rol.dto';

@Injectable()
export class DetalleRolService {
  create(createDetalleRolDto: CreateDetalleRolDto) {
    return 'This action adds a new detalleRol';
  }

  findAll() {
    return `This action returns all detalleRol`;
  }

  findOne(id: number) {
    return `This action returns a #${id} detalleRol`;
  }

  update(id: number, updateDetalleRolDto: UpdateDetalleRolDto) {
    return `This action updates a #${id} detalleRol`;
  }

  remove(id: number) {
    return `This action removes a #${id} detalleRol`;
  }
}
