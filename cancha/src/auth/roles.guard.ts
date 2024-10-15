import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RequestWithUser } from './interfaces/interface.requestWithUser';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Obtener los roles requeridos desde los metadatos
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si no se requiere ningún rol, se permite el acceso
    if (!requiredRoles || requiredRoles.length === 0) {
      return true; // Permitir acceso si no hay roles requeridos
    }

    // Obtener el usuario de la solicitud HTTP
    const request: RequestWithUser = context.switchToHttp().getRequest();
    const { usuario } = request;

    // Verificar si el usuario tiene el rol requerido
    if (!usuario || !requiredRoles.includes(usuario.rol)) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a este recurso',
      );
    }

    // Permitir el acceso si tiene el rol requerido
    return true;
  }
}
