import { Injectable } from '@nestjs/common';
import { CreateComplejoDto } from './dto/create-complejo.dto';
import { UpdateComplejoDto } from './dto/update-complejo.dto';

@Injectable()
export class ComplejoService {
  create(createComplejoDto: CreateComplejoDto) {
    return 'This action adds a new complejo';
  }

  findAll() {
    return `This action returns all complejo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} complejo`;
  }

  update(id: number, updateComplejoDto: UpdateComplejoDto) {
    return `This action updates a #${id} complejo`;
  }

  remove(id: number) {
    return `This action removes a #${id} complejo`;
  }
}
