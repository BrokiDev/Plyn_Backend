import type { NextFunction } from 'express';
import { AppError } from '../../utils/appError';
import { db } from '../../utils/db.server';
import { sendEmail } from '../../utils/Emails';
import { createTokenVerificationService } from '../token';
import { TokenType } from '../../interfaces/tokenType';

export const forgotPasswordService = async (
  email: string,
  next: NextFunction,
): Promise<
  | {
      message: string;
      status: string;
    }
  | undefined
> => {
  const emailFound = await db.users.findFirst({
    where: {
      email,
    },
  });

  if (!emailFound) {
    return await Promise.resolve({
      message:
        'If your Email is in our database. you gonna receive a new email to reset your password',
      status: 'success',
    });
  }

  const token = await createTokenVerificationService(
    { uuid: `${emailFound?.uuid}` },
    TokenType.PASSWORD_RESET,
  );

  if (!token) {
    next(new AppError('Token not Created', 500));
  }

  sendEmail({
    email: 'bryantro855@gmail.com',
    subject: "Password Reset Link : 'No Reply'",
    message: `Click the link to verify your email: ${process.env.CLIENT_URL}/verify-email/${token}`,
  }).catch((err: string) => {
    next(new AppError('Something went wrong' || err, 500));
  });
};
