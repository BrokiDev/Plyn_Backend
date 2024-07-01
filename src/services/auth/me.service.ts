/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { NextFunction, Request } from 'express';
import { decryptCookie } from '../../helpers/encrypt.service';
import { verifyToken } from '../../helpers/jwt.service';
import { AppError } from '../../utils/appError';
import { db } from '../../utils/db.server';

export const meService = async (
  req: Request,
  next: NextFunction,
): Promise<{
  id: number;
  uuid: string;
  fName: string;
  lName: string;
  companyName: string | null;
  email: string;
  active: boolean;
  createdAt: Date;
  updateAt: Date | null;
  deleteAt: Date | null;
} | null> => {
  const encryptedToken: string = req.cookies.SessionToken;
  if (!encryptedToken) {
    next(new AppError('Please log in', 401));
  }

  const token = decryptCookie(encryptedToken);

  const decoded = verifyToken(token);

  const user = await db.users.findFirst({
    where: {
      email: decoded.userId,
    },
  });

  if (!user) {
    next(new AppError('User not found', 404));
  }

  return user;
};
