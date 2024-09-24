import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from './entities';
import { CanchaModule } from './cancha/cancha.module';
import { ComplejoModule } from './complejo/complejo.module';
import { DetalleRolModule } from './detalle-rol/detalle-rol.module';
import { DisponibilidadModule } from './disponibilidad/disponibilidad.module';
import { EstadoModule } from './estado/estado.module';
import { LocalidadModule } from './localidad/localidad.module';
import { PermisoModule } from './permiso/permiso.module';
import { ReservaModule } from './reserva/reserva.module';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(), // Módulo para tareas programadas
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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
