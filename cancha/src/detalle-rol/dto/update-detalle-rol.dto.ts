import { PartialType } from '@nestjs/mapped-types';
import { CreateDetalleRolDto } from './create-detalle-rol.dto';

export class UpdateDetalleRolDto extends PartialType(CreateDetalleRolDto) {}
