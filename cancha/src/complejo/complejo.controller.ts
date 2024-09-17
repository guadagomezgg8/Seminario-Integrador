import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ComplejoService } from './complejo.service';
import { CreateComplejoDto } from './dto/create-complejo.dto';
import { UpdateComplejoDto } from './dto/update-complejo.dto';

@Controller('complejo')
export class ComplejoController {
  constructor(private readonly complejoService: ComplejoService) {}

  @Post()
  create(@Body() createComplejoDto: CreateComplejoDto) {
    return this.complejoService.create(createComplejoDto);
  }

  @Get()
  findAll() {
    return this.complejoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.complejoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComplejoDto: UpdateComplejoDto) {
    return this.complejoService.update(+id, updateComplejoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.complejoService.remove(+id);
  }
}
