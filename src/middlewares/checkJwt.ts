/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { NextFunction, Response } from 'express';
import { verifyToken } from '../helpers/jwt.service';
import { catchAsync } from '../helpers/catchAsync';
import { db } from '../utils/db.server';
import { AppError } from '../utils/appError';
import type { RequestExt } from '../interfaces/ReqExt';

export const checkJwt = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const jwtByUser = req.headers.authorization;
    const jwt = jwtByUser?.split(' ').pop();
    const validateToken = verifyToken(`${jwt}`);

    if (!validateToken) {
      next(new AppError(`you don't have access to this route`, 401));
    }

    const currentUser = await db.users.findFirst({
      where: { email: validateToken.userId },
    });

    if (!currentUser) {
      next(new AppError('Unauthorized', 401));
    }

    req.user = currentUser;
    next();
  },
);
