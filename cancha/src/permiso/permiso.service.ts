import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { Permiso } from 'src/entities/permiso.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PermisoService {
  
  constructor(
    @InjectRepository(Permiso)
    private readonly permisoRepository: Repository<Permiso>
  ) {}

  async create(createPermisoDto: CreatePermisoDto): Promise<Permiso> {
    const permiso = this.permisoRepository.create(createPermisoDto);
    return await this.permisoRepository.save(permiso);
  }

  async findAll(): Promise<Permiso[]> {
    return await this.permisoRepository.find();
  }

  async findOne(id: number): Promise<Permiso> {
    return await this.permisoRepository.findOneBy({id});
  }

  async update(id: number, updatePermisoDto: UpdatePermisoDto): Promise<Permiso> {
    const permiso = await this.permisoRepository.findOneBy({id});
    if (!permiso) {
      throw new NotFoundException('Permiso no encontrado');
    }

    // Filtrar las propiedades del DTO que están definidas
    const camposActualizables = Object.fromEntries(
      Object.entries(updatePermisoDto).filter(([_, value]) => value !== undefined)
    );

    // Si no hay campos para actualizar, lanzar una excepción
    if (Object.keys(camposActualizables).length === 0) {
      throw new BadRequestException('No hay campos para actualizar');
    }

    // Realiza la actualización usando TypeORM update
    await this.permisoRepository.update(id, camposActualizables);

    // Retorna el ejercicio actualizado
    return await this.permisoRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    const permiso = await this.permisoRepository.findOneBy({id});
    await this.permisoRepository.remove(permiso);
  }

}
