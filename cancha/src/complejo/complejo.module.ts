import { Module } from '@nestjs/common';
import { ComplejoService } from './complejo.service';
import { ComplejoController } from './complejo.controller';

@Module({
  controllers: [ComplejoController],
  providers: [ComplejoService],
})
export class ComplejoModule {}
