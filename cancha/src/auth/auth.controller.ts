import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGuard } from './auth.guard';
import { RequestWithUser } from './interfaces/interface.requestWithUser';
import { Roles } from './decorators/roles.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  // Solo los usuarios autenticados con el rol 'Cliente' pueden acceder
  @Get('profile')
  @Roles('Cliente')
  @UseGuards(AuthGuard, RolesGuard) // Primero el AuthGuard, luego el RolesGuard
  profile(
    @Request()
    req: RequestWithUser,
  ) {
    return req.usuario;
  }
}
