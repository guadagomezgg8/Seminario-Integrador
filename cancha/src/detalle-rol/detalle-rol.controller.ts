import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DetalleRolService } from './detalle-rol.service';
import { CreateDetalleRolDto } from './dto/create-detalle-rol.dto';
import { UpdateDetalleRolDto } from './dto/update-detalle-rol.dto';

@Controller('detalle-rol')
export class DetalleRolController {
  constructor(private readonly detalleRolService: DetalleRolService) {}

  @Post()
  create(@Body() createDetalleRolDto: CreateDetalleRolDto) {
    return this.detalleRolService.create(createDetalleRolDto);
  }

  @Get()
  findAll() {
    return this.detalleRolService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.detalleRolService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDetalleRolDto: UpdateDetalleRolDto) {
    return this.detalleRolService.update(+id, updateDetalleRolDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.detalleRolService.remove(+id);
  }
}
