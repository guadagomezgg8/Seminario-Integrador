import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CanchaService } from './cancha.service';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';
import { Cancha } from '../entities/cancha.entity';

@Controller('cancha')
export class CanchaController {
  constructor(private readonly canchaService: CanchaService) {}

  @Post()
  async create(@Body() createCanchaDto: CreateCanchaDto): Promise<Cancha> {
    return await this.canchaService.create(createCanchaDto);
  }


  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Cancha> {
    return await this.canchaService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateCanchaDto: UpdateCanchaDto): Promise<Cancha> {
    return await this.canchaService.update(id, updateCanchaDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.canchaService.remove(id);
  }

  @Get()
  async obtenerCanchasDisponibles(
    @Query('fecha') fecha?: string, 
    @Query('horaInicio') horaInicio?: string, 
    @Query('horafin') horafin?: string, 
    @Query('tipo') tipo?: string): Promise<Cancha[]> {
      console.log('Endpoint');
      return await this.canchaService.obtenerCanchasDisponibles(fecha, horaInicio, horafin, tipo);
  }

}
