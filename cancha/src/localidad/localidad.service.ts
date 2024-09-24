import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { Localidad } from 'src/entities/localidad.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LocalidadService {
  
  constructor(
    @InjectRepository(Localidad)
    private readonly localidadRepository: Repository<Localidad>
  ) {}

  async create(createLocalidadDto: CreateLocalidadDto): Promise<Localidad> {
    const localidad = this.localidadRepository.create(createLocalidadDto);
    return await this.localidadRepository.save(localidad);
  }

  async findAll(): Promise<Localidad[]> {
    return await this.localidadRepository.find();
  }

  async findOne(id: number): Promise<Localidad> {
    return await this.localidadRepository.findOneBy({id});
  }

  async update(id: number, updateLocalidadDto: UpdateLocalidadDto): Promise<Localidad> {
    const localidad = await this.localidadRepository.findOneBy({id});
    if (!localidad) {
      throw new NotFoundException('localidad no encontrada');
    }

    // Filtrar las propiedades del DTO que están definidas
    const camposActualizables = Object.fromEntries(
      Object.entries(updateLocalidadDto).filter(([_, value]) => value !== undefined)
    );

    // Si no hay campos para actualizar, lanzar una excepción
    if (Object.keys(camposActualizables).length === 0) {
      throw new BadRequestException('No hay campos para actualizar');
    }

    // Realiza la actualización usando TypeORM update
    await this.localidadRepository.update(id, camposActualizables);

    // Retorna el ejercicio actualizado
    return await this.localidadRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    const localidad = await this.localidadRepository.findOneBy({id});
    await this.localidadRepository.remove(localidad);
  }

}
