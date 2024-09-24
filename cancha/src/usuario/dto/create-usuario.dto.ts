export class CreateUsuarioDto {
  email: string;
  contraseña: string;
  nombre: string;
  apellido: string;
  telefono: string;
  direccion: string;
  localidad: string;
  rol?: string;
}
