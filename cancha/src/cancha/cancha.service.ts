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

  async obtenerCanchasDisponibles(fecha: string, horaInicio: string, horaFin: string, tipoCancha: string): Promise<Cancha[]> {
    try {
      console.log("ejecutando");
      // Obtener todas las canchas con sus disponibilidades
      const canchas = await this.canchaRepository.find({relations: ['disponibilidades']});
      console.log(canchas);
  
      const canchasDisponibles: Cancha[] = [];
  
      // Filtramos las canchas según los filtros aplicables
      for (const cancha of canchas) {
        const disponibilidadesValidas = cancha.disponibilidades.filter(disponibilidad => {
          // Verifica si se debe filtrar por fecha
          const mismaFecha = fecha ? this.sonMismaFecha(disponibilidad.fecha, fecha) : true;
          console.log(mismaFecha);

          // Verifica si se debe filtrar por horario
          const disponibilidadDentroHorario = (horaInicio && horaFin) ?
            (disponibilidad.horaInicio >= horaInicio && disponibilidad.horaFin <= horaFin) : true;
          console.log(mismaFecha);

          // Verifica si se debe filtrar por tipo de cancha
          const tipoCanchaValido = tipoCancha ? cancha.tipo === tipoCancha : true;
          console.log(mismaFecha);

          return mismaFecha && disponibilidadDentroHorario && tipoCanchaValido;
        });
  
        console.log(disponibilidadesValidas);
        if (disponibilidadesValidas.length > 0) {
          canchasDisponibles.push(cancha);
        }
      }
      console.log(canchasDisponibles);
  
      return canchasDisponibles;
  
    } catch (error) {
      console.error('Error obteniendo canchas disponibles:', error);
      throw new Error('No se pudieron obtener las canchas disponibles.');
    }
  }
  
  private sonMismaFecha(fecha1: string, fecha2: string): boolean {
    // Extraer día, mes y año de las fechas en formato 'YYYY-MM-DD'
    const [año1, mes1, dia1] = fecha1.split('-').map(Number);
    const [año2, mes2, dia2] = fecha2.split('-').map(Number);
  
    return (año1 === año2 && mes1 === mes2 && dia1 === dia2);
  }
  
}
