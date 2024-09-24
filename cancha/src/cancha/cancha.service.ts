import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancha } from '../entities/cancha.entity';

@Injectable()
export class CanchaService {

  constructor(
    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>
  ) {}

  async create(createCanchaDto: CreateCanchaDto): Promise<Cancha> {
    const cancha = this.canchaRepository.create(createCanchaDto);
    return await this.canchaRepository.save(cancha);
  }

  async findAll(): Promise<Cancha[]> {
    return await this.canchaRepository.find();
  }

  async findOne(id: number): Promise<Cancha> {
    return await this.canchaRepository.findOneBy({id});
  }

  async update(id: number, updateCanchaDto: UpdateCanchaDto): Promise<Cancha> {
    const cancha = await this.canchaRepository.findOneBy({id});
    if (!cancha) {
      throw new NotFoundException('Cancha no encontrada');
    }

    // Filtrar las propiedades del DTO que están definidas
    const camposActualizables = Object.fromEntries(
      Object.entries(updateCanchaDto).filter(([_, value]) => value !== undefined)
    );

    // Si no hay campos para actualizar, lanzar una excepción
    if (Object.keys(camposActualizables).length === 0) {
      throw new BadRequestException('No hay campos para actualizar');
    }

    // Realiza la actualización usando TypeORM update
    await this.canchaRepository.update(id, camposActualizables);

    // Retorna el ejercicio actualizado
    return await this.canchaRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    const cancha = await this.canchaRepository.findOneBy({id});
    await this.canchaRepository.remove(cancha);
  }
}
