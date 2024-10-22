import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComplejoService } from './complejo.service';
import { CreateComplejoDto } from './dto/create-complejo.dto';
import { UpdateComplejoDto } from './dto/update-complejo.dto';
import { Complejo } from 'src/entities/complejo.entity';

@Controller('complejo')
export class ComplejoController {
  constructor(private readonly complejoService: ComplejoService) {}

  @Post()
  async create(
    @Body() createComplejoDto: CreateComplejoDto,
  ): Promise<Complejo> {
    return await this.complejoService.create(createComplejoDto);
  }

  @Get()
  async findAll(): Promise<Complejo[]> {
    return await this.complejoService.findAll(); // Devolver los complejos sin mapearlos
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Complejo> {
    return await this.complejoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateComplejoDto: UpdateComplejoDto,
  ): Promise<Complejo> {
    return await this.complejoService.update(id, updateComplejoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return await this.complejoService.remove(id);
  }
}
