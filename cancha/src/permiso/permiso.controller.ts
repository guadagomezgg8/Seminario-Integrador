import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermisoService } from './permiso.service';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { Permiso } from 'src/entities/permiso.entity';

@Controller('permiso')
export class PermisoController {

  constructor(private readonly permisoService: PermisoService) {}

  @Post()
  async create(@Body() createPermisoDto: CreatePermisoDto): Promise<Permiso> {
    return await this.permisoService.create(createPermisoDto);
  }

  @Get()
  async findAll(): Promise<Permiso[]> {
    return await this.permisoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Permiso> {
    return await this.permisoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updatePermisoDto: UpdatePermisoDto): Promise<Permiso> {
    return await this.permisoService.update(id, updatePermisoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.permisoService.remove(id);
  }
  
}
