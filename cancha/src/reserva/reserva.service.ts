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

  async create(
    createReservaDto: CreateReservaDto,
    clienteEmail: string,
  ): Promise<Reserva> {
    // Obtener la cancha
    const cancha = await this.canchaRepository.findOne({
      where: { id: createReservaDto.canchaId },
      relations: ['disponibilidades'], // Asegúrate de incluir las disponibilidades
    });

    if (!cancha) {
      throw new BadRequestException('La cancha no existe.');
    }

    // Verificar si hay una disponibilidad que coincida con la hora de inicio
    const disponibilidadIndex = cancha.disponibilidades.findIndex(
      (d) =>
        d.horaInicio === createReservaDto.horaInicio &&
        d.fecha === createReservaDto.fecha,
    );

    if (disponibilidadIndex === -1) {
      throw new BadRequestException(
        'La cancha no está disponible en ese horario.',
      );
    }

    // Obtener el cliente
    const cliente = await this.usuarioRepository.findOne({
      where: { email: clienteEmail },
    });

    if (!cliente) {
      throw new BadRequestException('El cliente no existe.');
    }

    // Obtener el estado 'Pendiente'
    const estado = await this.estadoRepository.findOne({
      where: { nombre: 'Pendiente' },
    });

    // Calcular horaFin sumando 1 hora a horaInicio
    const horaFin = this.sumarUnaHora(createReservaDto.horaInicio);

    const reserva = this.reservaRepository.create({
      fecha: createReservaDto.fecha,
      horaInicio: createReservaDto.horaInicio,
      horaFin,
      cancha,
      cliente,
      estado,
    });

    // Guardar la reserva
    const nuevaReserva = await this.reservaRepository.save(reserva);

    // Eliminar la disponibilidad correspondiente
    cancha.disponibilidades.splice(disponibilidadIndex, 1);

    // Actualizar la cancha para reflejar el cambio
    await this.canchaRepository.save(cancha);

    return nuevaReserva;
  }

  private sumarUnaHora(hora: string): string {
    const [horas, minutos] = hora.split(':').map(Number);
    const nuevaHora = (horas + 1) % 24; // Asegúrate de que no supere 24 horas
    return `${nuevaHora.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}`;
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

  async listarReservasComplejo(complejoId: number): Promise<Reserva[]> {
    return await this.reservaRepository
      .createQueryBuilder('reserva')
      .innerJoinAndSelect('reserva.cancha', 'cancha')
      .innerJoinAndSelect('cancha.complejo', 'complejo')
      .where('complejo.id = :complejoId', { complejoId })
      .andWhere('reserva.estado = :estado', { estado: 'Pendiente' }) // Asegúrate de que 'Pendiente' es un estado definido
      .getMany();
  }
}
