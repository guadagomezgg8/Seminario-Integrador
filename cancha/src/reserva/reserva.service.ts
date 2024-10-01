import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cancha } from 'src/entities/cancha.entity';
import { Estado } from 'src/entities/estado.entity';
import { Reserva } from 'src/entities/reserva.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private readonly reservaRepository: Repository<Reserva>,
    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Estado)
    private readonly estadoRepository: Repository<Estado>,
  ) {}

  async registrarReserva(
    usuarioId: number,
    createReservaDto: CreateReservaDto,
  ): Promise<Reserva> {
    // Verificar que la cancha exista
    const cancha = await this.canchaRepository.findOne({
      where: { id: createReservaDto.canchaId },
      relations: ['disponibilidades'],
    });

    if (!cancha) {
      throw new NotFoundException('Cancha no encontrada');
    }

    // Verificar que la cancha esté disponible en la fecha y hora solicitada
    const disponibilidad = cancha.disponibilidades.find(
      (disponibilidad) =>
        disponibilidad.fecha === createReservaDto.fecha &&
        disponibilidad.horaInicio <= createReservaDto.horaInicio &&
        disponibilidad.horaFin >= createReservaDto.horaFin,
    );
    if (!disponibilidad) {
      throw new BadRequestException(
        'La cancha no está disponible en ese horario',
      );
    }

    const cliente = await this.usuarioRepository.findOneBy({ id: usuarioId });

    const estado = await this.estadoRepository.findOneBy({
      nombre: 'Pendiente',
    });

    // Crear una nueva reserva
    const reserva = this.reservaRepository.create({
      cliente,
      cancha,
      fecha: createReservaDto.fecha,
      horaInicio: createReservaDto.horaInicio,
      horaFin: createReservaDto.horaFin,
      estado,
    });

    // Guardar la reserva
    return await this.reservaRepository.save(reserva);
  }

  async cancelarReserva(reservaId: number): Promise<void> {
    const reserva = await this.reservaRepository.findOneBy({ id: reservaId });
    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }
    await this.reservaRepository.remove(reserva);
  }

  async consultarReserva(reservaId: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id: reservaId },
      relations: ['cancha', 'cliente', 'estado'],
    });
    if (!reserva) {
      throw new NotFoundException('Reserva no encontrada');
    }
    return reserva;
  }

  async consultarReservasPorUsuario(usuarioId: number): Promise<Reserva[]> {
    return await this.reservaRepository.find({
      where: { cliente: { id: usuarioId } },
      relations: ['cancha', 'estado'],
    });
  }
}
