import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  Get,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Reserva } from 'src/entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { RequestWithUser } from 'src/auth/interfaces/interface.requestWithUser';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Roles('Cliente')
  @UseGuards(AuthGuard, RolesGuard) // Primero el AuthGuard, luego el RolesGuard
  @Post()
  async create(
    @Body() createReservaDto: CreateReservaDto,
    @Request() req: RequestWithUser, // Obtener la solicitud para acceder al usuario autenticado
  ) {
    const clienteEmail = req.usuario.email; // Suponiendo que el ID del usuario está en el payload del token
    return this.reservaService.create(createReservaDto, clienteEmail);
  }

  @Delete(':id')
  async cancelarReserva(@Param('id') reservaId: number): Promise<void> {
    await this.reservaService.cancelarReserva(reservaId);
  }

  @Get(':id')
  async consultarReserva(@Param('id') reservaId: number): Promise<Reserva> {
    return await this.reservaService.consultarReserva(reservaId);
  }

  @Get()
  async consultarReservas(@Request() req: any): Promise<Reserva[]> {
    const usuarioId = req.user.id; // Obtén el ID del usuario del token
    return await this.reservaService.consultarReservasPorUsuario(usuarioId);
  }

  @Get('pendientes/:complejoId')
  async listarReservasComplejo(@Param('complejoId') complejoId: number) {
    return await this.reservaService.listarReservasComplejo(complejoId);
  }
}
