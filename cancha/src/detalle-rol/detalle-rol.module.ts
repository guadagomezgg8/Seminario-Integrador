import { Module } from '@nestjs/common';
import { DetalleRolService } from './detalle-rol.service';
import { DetalleRolController } from './detalle-rol.controller';

@Module({
  controllers: [DetalleRolController],
  providers: [DetalleRolService],
})
export class DetalleRolModule {}
