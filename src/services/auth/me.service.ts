import type { NextFunction, Request } from 'express';
import { decryptCookie } from '../../helpers/encrypt.service';
import { verifyToken } from '../../helpers/jwt.service';
import { AppError } from '../../utils/appError';
import { db } from '../../utils/db.server';

export const meService = async (req: Request, next: NextFunction) => {
  const encryptedToken: string = req.cookies.SessionToken;
  if (!encryptedToken) {
    return next(new AppError('Please log in', 401));
  }

  const token = decryptCookie(encryptedToken);

  const decoded = verifyToken(token);

  if (!decoded) {
    return next(new AppError('Invalid token', 401));
  }

  const user = await db.users.findFirst({
    where: {
      email: decoded.userId,
    },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  return user;
};
