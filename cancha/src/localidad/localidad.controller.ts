import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocalidadService } from './localidad.service';
import { CreateLocalidadDto } from './dto/create-localidad.dto';
import { UpdateLocalidadDto } from './dto/update-localidad.dto';
import { Localidad } from 'src/entities/localidad.entity';

@Controller('localidad')
export class LocalidadController {

  constructor(private readonly localidadService: LocalidadService) {}

  @Post()
  async create(@Body() createLocalidadDto: CreateLocalidadDto): Promise<Localidad> {
    return await this.localidadService.create(createLocalidadDto);
  }

  @Get()
  async findAll(): Promise<Localidad[]> {
    return await this.localidadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Localidad> {
    return await this.localidadService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateLocalidadDto: UpdateLocalidadDto): Promise<Localidad> {
    return await this.localidadService.update(id, updateLocalidadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.localidadService.remove(id);
  }
}
