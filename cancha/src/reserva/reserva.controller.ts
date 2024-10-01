import { Controller, Post, Body } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { Reserva } from 'src/entities/reserva.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';

@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  async crearReserva(
    @Request() req: any, // Aquí se recibe la solicitud con el usuario autenticado
    @Body() createReservaDto: CreateReservaDto,
  ): Promise<Reserva> {
    const usuarioId = req.user.id; // Obtén el ID del usuario del token
    return await this.reservaService.registrarReserva(
      usuarioId,
      createReservaDto,
    );
  }
}
