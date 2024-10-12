import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from 'src/usuario/usuario.service';
import { RegisterDto } from './dto/register.dto';
import * as bcryptjs from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuarioService: UsuarioService,
    private readonly jwtService: JwtService,
  ) {}

  async registerCliente(registerDto: RegisterDto) {
    const usuario = await this.usuarioService.findOneByEmail(registerDto.email);

    if (usuario) {
      throw new BadRequestException('El email ya existe');
    }

    const contrasenaHasheada = await bcryptjs.hash(registerDto.contrasena, 10);

    await this.usuarioService.create({
      email: registerDto.email,
      contrasena: contrasenaHasheada,
      nombre: registerDto.nombre,
      apellido: registerDto.apellido,
      telefono: registerDto.telefono,
      direccion: registerDto.direccion,
      localidad: registerDto.localidad,
      rol: 'Cliente',
    });

    return {
      message: 'Usuario creado exitosamente',
    };
  }

  async login(loginDto: LoginDto) {
    const usuario = await this.usuarioService.findOneByEmail(loginDto.email);

    if (!usuario) {
      throw new UnauthorizedException('Email inválido');
    }

    const constrasenaValidada = await bcryptjs.compare(
      loginDto.contrasena,
      usuario.contrasena,
    );

    if (!constrasenaValidada) {
      throw new UnauthorizedException('Contraseña inválida');
    }

    const payload = { email: usuario.email, rol: usuario.rol };

    const token = await this.jwtService.signAsync(payload);

    return {
      token: token,
      email: usuario.email,
    };
  }
}
