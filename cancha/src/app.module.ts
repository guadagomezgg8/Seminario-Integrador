import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { CanchaModule } from './cancha/cancha.module';
import { ComplejoResolver } from './complejo/complejo.resolver';
import { ComplejoModule } from './complejo/complejo.module';
import { DetalleRolModule } from './detalle-rol/detalle-rol.module';
import { DisponibilidadModule } from './disponibilidad/disponibilidad.module';
import { EstadoModule } from './estado/estado.module';
import { LocalidadModule } from './localidad/localidad.module';
import { PermisoModule } from './permiso/permiso.module';
import { ReservaModule } from './reserva/reserva.module';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'canchas.db',
      entities,
      synchronize: true,
    }),
    CanchaModule,
    ComplejoModule,
    DetalleRolModule,
    DisponibilidadModule,
    EstadoModule,
    LocalidadModule,
    PermisoModule,
    ReservaModule,
    RolModule,
    UsuarioModule,
  ],
  controllers: [AppController],
  providers: [AppService, ComplejoResolver],
})
export class AppModule {}
