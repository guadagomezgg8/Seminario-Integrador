import { Request } from 'express';

export interface RequestWithUser extends Request {
  usuario: { email: string; rol: string };
}
