import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from 'src/entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Localidad } from 'src/entities/localidad.entity';
import { Rol } from 'src/entities/rol.entity';

@Injectable()
export class UsuarioService {
  
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
    @InjectRepository(Localidad)
    private readonly localidadRepository: Repository<Localidad>,
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const localidad = await this.localidadRepository.findOneBy({ nombre: createUsuarioDto.localidad });
    const rol = createUsuarioDto.rol ? await this.rolRepository.findOneBy({ nombre: createUsuarioDto.rol }) : null;
    const usuario = this.usuarioRepository.create({
      ...createUsuarioDto,
      localidad,
      rol,
    });
    return await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return await this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    return await this.usuarioRepository.findOneBy({id});
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({id});
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    // Filtrar las propiedades del DTO que están definidas
    const camposActualizables = Object.fromEntries(
      Object.entries(updateUsuarioDto).filter(([_, value]) => value !== undefined)
    );

    // Si no hay campos para actualizar, lanzar una excepción
    if (Object.keys(camposActualizables).length === 0) {
      throw new BadRequestException('No hay campos para actualizar');
    }

    // Realiza la actualización usando TypeORM update
    await this.usuarioRepository.update(id, camposActualizables);

    // Retorna el ejercicio actualizado
    return await this.usuarioRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    const usuario = await this.usuarioRepository.findOneBy({id});
    await this.usuarioRepository.remove(usuario);
  }

}
