import { Module } from '@nestjs/common';
import { ComplejoService } from './complejo.service';
import { ComplejoController } from './complejo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Complejo } from 'src/entities/complejo.entity';
import { Localidad } from 'src/entities/localidad.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Complejo, Localidad])],
  controllers: [ComplejoController],
  providers: [ComplejoService],
})
export class ComplejoModule {}
