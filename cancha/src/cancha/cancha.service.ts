import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancha } from '../entities/cancha.entity';
import { Complejo } from 'src/entities/complejo.entity';
import { Disponibilidad } from 'src/entities/disponibilidad.entity';

@Injectable()
export class CanchaService {

  constructor(
    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,
    @InjectRepository(Complejo)
    private readonly complejoRepository: Repository<Complejo>,
    @InjectRepository(Disponibilidad)
    private readonly disponibilidadRepository: Repository<Disponibilidad>,
  ) {}

  async create(createCanchaDto: CreateCanchaDto): Promise<Cancha> {
    const complejo = await this.complejoRepository.findOneBy({id: createCanchaDto.complejoId});
    if (!complejo) {
      throw new NotFoundException('Complejo no encontrado');
    }
    const cancha = this.canchaRepository.create({
      ...createCanchaDto,
      complejo,
    });
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

  async obtenerCanchasDisponibles(fecha?: string, horaInicio?: string, horaFin?: string, tipo?: string): Promise<Cancha[]> {
    let canchasFiltradas = await this.canchaRepository.find({relations: ['disponibilidades']});
    console.log(canchasFiltradas)
    
    if (fecha) {
      canchasFiltradas = canchasFiltradas.filter(cancha => 
        cancha.disponibilidades.some(disponibilidad => disponibilidad.fecha === fecha)
      );
    }
    console.log(canchasFiltradas)
    
    if (horaInicio) {
      canchasFiltradas = canchasFiltradas.filter(cancha => 
        cancha.disponibilidades.some(disponibilidad => disponibilidad.horaInicio >= horaInicio)
      );
    }
    console.log(canchasFiltradas)

    if (horaFin) {
      canchasFiltradas = canchasFiltradas.filter(cancha => 
        cancha.disponibilidades.some(disponibilidad => disponibilidad.horaFin <= horaFin)
      );
    }
    console.log(canchasFiltradas)
    
    if (tipo) {
      canchasFiltradas = canchasFiltradas.filter(cancha => cancha.tipo === tipo);
    }
    console.log(canchasFiltradas)
    
    return canchasFiltradas;
  }
  
}
