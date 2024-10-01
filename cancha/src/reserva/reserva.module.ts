import { Module } from '@nestjs/common';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reserva } from 'src/entities/reserva.entity';
import { Estado } from 'src/entities/estado.entity';
import { Usuario } from 'src/entities/usuario.entity';
import { Cancha } from 'src/entities/cancha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Estado, Usuario, Cancha])],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
