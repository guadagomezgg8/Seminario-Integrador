import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Disponibilidad } from 'src/entities/disponibilidad.entity';
import { Repository } from 'typeorm';
import { Complejo } from 'src/entities/complejo.entity';
import { Cancha } from 'src/entities/cancha.entity';

@Injectable()
export class DisponibilidadService {

  constructor(
    @InjectRepository(Disponibilidad)
    private readonly disponibilidadRepository: Repository<Disponibilidad>,
    @InjectRepository(Complejo)
    private readonly complejoRepository: Repository<Complejo>,
    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,
  ) {}

  @Cron('0 0 * * *') // Se repite todos los días a las 00:00 hs
  async generarDisponibilidadesParaTodosLosComplejos(): Promise<void> {
    try {
      const complejos = await this.complejoRepository.find({relations: ['canchas']});

      let fecha = new Date();
      fecha.setMonth(fecha.getMonth() + 1);

      for (const complejo of complejos) {
        const [horaApertura, horaCierre] = complejo.rangoHorario.split('-').map(hora => parseInt(hora.split(':')[0]));

        for (let hora = horaApertura; hora < horaCierre; hora++) {
          const horaInicio = `${hora}:00`;
          const horaFin = `${hora + 1}:00`;

          // Verifica si la disponibilidad ya existe
          let disponibilidadExistente = await this.disponibilidadRepository.findOne({where: {fecha: fecha.toString().substring(0,10), horaInicio, horaFin}});

          // Si no existe, la creamos
          if (!disponibilidadExistente) {
            disponibilidadExistente = this.disponibilidadRepository.create({
              fecha: fecha.toString().substring(0,10),
              horaInicio,
              horaFin,
            });

            // Guarda la nueva disponibilidad
            await this.disponibilidadRepository.save(disponibilidadExistente);
          }

          // Asigna la disponibilidad (ya sea nueva o existente) a cada cancha del complejo
          for (const cancha of complejo.canchas) {
            if (!cancha.disponibilidades) {
              cancha.disponibilidades = []; // Inicializa si es necesario
            }
            cancha.disponibilidades.push(disponibilidadExistente);
            await this.canchaRepository.save(cancha);
          }
        }
      }
    } catch (error) {
      console.error('Error generando disponibilidades:', error);
    }
  }

}
