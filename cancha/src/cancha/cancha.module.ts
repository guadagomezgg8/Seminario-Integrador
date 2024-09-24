import { Module } from '@nestjs/common';
import { CanchaService } from './cancha.service';
import { CanchaController } from './cancha.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cancha } from '../entities/cancha.entity';
import { Complejo } from 'src/entities/complejo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cancha, Complejo])],
  controllers: [CanchaController],
  providers: [CanchaService],
})
export class CanchaModule {}
