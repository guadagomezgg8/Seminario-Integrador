import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateComplejoDto } from './dto/create-complejo.dto';
import { UpdateComplejoDto } from './dto/update-complejo.dto';
import { Complejo } from 'src/entities/complejo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localidad } from 'src/entities/localidad.entity';

@Injectable()
export class ComplejoService {

  constructor(
    @InjectRepository(Complejo)
    private readonly complejoRepository: Repository<Complejo>,
    @InjectRepository(Localidad)
    private readonly localidadRepository: Repository<Localidad>,
  ) {}

  async create(createComplejoDto: CreateComplejoDto): Promise<Complejo> {
    const localidad = await this.localidadRepository.findOneBy({nombre:createComplejoDto.localidad});
    const complejo = this.complejoRepository.create({
      ...createComplejoDto,
      localidad,
      canchas: [],
    });
    return await this.complejoRepository.save(complejo);
  }

  async findAll(): Promise<Complejo[]> {
    return await this.complejoRepository.find();
  }

  async findOne(id: number): Promise<Complejo> {
    return await this.complejoRepository.findOneBy({id});
  }

  async update(id: number, updateComplejoDto: UpdateComplejoDto): Promise<Complejo> {
    const complejo = await this.complejoRepository.findOneBy({id});
    if (!complejo) {
      throw new NotFoundException('Complejo no encontrado');
    }

    // Filtrar las propiedades del DTO que están definidas
    const camposActualizables = Object.fromEntries(
      Object.entries(updateComplejoDto).filter(([_, value]) => value !== undefined)
    );

    // Si no hay campos para actualizar, lanzar una excepción
    if (Object.keys(camposActualizables).length === 0) {
      throw new BadRequestException('No hay campos para actualizar');
    }

    // Realiza la actualización usando TypeORM update
    await this.complejoRepository.update(id, camposActualizables);

    // Retorna el ejercicio actualizado
    return await this.complejoRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    const complejo = await this.complejoRepository.findOneBy({id});
    await this.complejoRepository.remove(complejo);
  }
}
