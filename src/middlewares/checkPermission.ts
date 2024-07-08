import type { NextFunction, Response } from 'express';
import type { RequestExt } from '../interfaces/ReqExt';
import { AppError } from '../utils/appError';
import { db } from '../utils/db.server';

export const checkPermission = (...roles: string[]) => {
  return async ({ user }: RequestExt, _res: Response, next: NextFunction) => {
    const validUserRole = await db.roles.findFirst({
      where: {
        userId: user?.uuid,
      },
      select: {
        name: true,
      },
    });

    const role = `${validUserRole?.name}`;

    if (!roles.includes(role)) {
      return next(
        new AppError(`You don't have permission to perform this action`, 403),
      );
    }
    next();
  };
};
