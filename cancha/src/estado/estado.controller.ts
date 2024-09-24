import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EstadoService } from './estado.service';
import { CreateEstadoDto } from './dto/create-estado.dto';
import { UpdateEstadoDto } from './dto/update-estado.dto';
import { Estado } from '../entities/estado.entity';

@Controller('estado')
export class EstadoController {

  constructor(private readonly estadoService: EstadoService) {}

  @Post()
  async create(@Body() createEstadoDto: CreateEstadoDto): Promise<Estado> {
    return await this.estadoService.create(createEstadoDto);
  }

  @Get()
  async findAll(): Promise<Estado[]> {
    return await this.estadoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Estado> {
    return await this.estadoService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateEstadoDto: UpdateEstadoDto): Promise<Estado> {
    return await this.estadoService.update(id, updateEstadoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.estadoService.remove(id);
  }
  
}
