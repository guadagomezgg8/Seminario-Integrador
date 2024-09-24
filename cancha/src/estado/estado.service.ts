import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Estado } from 'src/entities/estado.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EstadoService {

  constructor(
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>
  ) {}

  async create(createEstadoDto: CreateEstadoDto): Promise<Estado> {
    const estado = this.estadoRepository.create(createEstadoDto);
    return await this.estadoRepository.save(estado);
  }

  async findAll(): Promise<Estado[]> {
    return await this.estadoRepository.find();
  }

  async findOne(id: number): Promise<Estado> {
    return await this.estadoRepository.findOneBy({id});
  }

  async update(id: number, updateEstadoDto: UpdateEstadoDto): Promise<Estado> {
    const estado = await this.estadoRepository.findOneBy({id});
    if (!estado) {
      throw new NotFoundException('Estado no encontrado');
    }

    // Filtrar las propiedades del DTO que están definidas
    const camposActualizables = Object.fromEntries(
      Object.entries(updateEstadoDto).filter(([_, value]) => value !== undefined)
    );

    // Si no hay campos para actualizar, lanzar una excepción
    if (Object.keys(camposActualizables).length === 0) {
      throw new BadRequestException('No hay campos para actualizar');
    }

    // Realiza la actualización usando TypeORM update
    await this.estadoRepository.update(id, camposActualizables);

    // Retorna el ejercicio actualizado
    return await this.estadoRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    const estado = await this.estadoRepository.findOneBy({id});
    await this.estadoRepository.remove(estado);
  }

}
