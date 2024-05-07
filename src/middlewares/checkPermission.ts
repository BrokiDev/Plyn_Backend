import type { NextFunction, Response } from 'express';
import type { RequestExt } from '../interfaces/ReqExt';
import { AppError } from '../utils/appError';

export const checkPermission = (...roles: string[]) => {
  return ({ user }: RequestExt, _res: Response, next: NextFunction) => {
    const role = `${user?.role}`;

    if (!roles.includes(role)) {
      next(
        new AppError(`You don't have permission to perform this action`, 403),
      );
    }
    next();
  };
};
