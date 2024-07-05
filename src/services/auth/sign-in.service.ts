import type { NextFunction } from 'express';
import { verifyPasswordService } from '../../helpers/encrypt.service';
import { generateToken } from '../../helpers/jwt.service';
import { AppError } from '../../utils/appError';
import { db } from '../../utils/db.server';

export const signInService = async (
  email: string,
  password: string,
  next: NextFunction,
): Promise<{
  token: string;
  user: {
    email: string;
  };
}> => {
  const user = await db.users.findFirst({
    where: { email },
  });

  const validPassword = await db.user_passwords.findFirst({
    where: {
      user: {
        email: user?.email,
      },
      active: true,
    },
    select: {
      password: true,
    },
  });

  const isPasswordValid = verifyPasswordService(
    password,
    `${validPassword?.password}`,
  );

  if (!user || !isPasswordValid) {
    next(new AppError('Invalid Credentials', 401));
  }

  if (!user?.active) {
    next(new AppError('Please verify your email before log in', 401));
  }

  const token = generateToken(`${user?.email}`);

  return { token, user: { email: `${user?.email}` } };
};
