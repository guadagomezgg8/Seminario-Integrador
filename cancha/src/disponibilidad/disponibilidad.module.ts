import { Module } from '@nestjs/common';
import { DisponibilidadService } from './disponibilidad.service';
import { DisponibilidadController } from './disponibilidad.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Disponibilidad } from 'src/entities/disponibilidad.entity';
import { Complejo } from 'src/entities/complejo.entity';
import { Cancha } from 'src/entities/cancha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Disponibilidad, Complejo, Cancha])],
  controllers: [DisponibilidadController],
  providers: [DisponibilidadService],
})
export class DisponibilidadModule {}
