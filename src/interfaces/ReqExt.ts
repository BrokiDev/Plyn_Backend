import type { Request } from 'express';
import type { User } from './Users.interface';

export interface RequestExt extends Request {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: User | any;
}
