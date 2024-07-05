/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { NextFunction } from 'express';
import { hashedPasswordService } from '../../helpers/encrypt.service';
import type { User } from '../../interfaces/Users.interface';
import { AppError } from '../../utils/appError';
import { db } from '../../utils/db.server';
import { sendEmail } from '../../utils/Emails';
import { createTokenVerificationService } from '../token';
import { TokenType } from '../../interfaces/tokenType';

export const signUpService = async (
  dataBody: User,
  next: NextFunction,
): Promise<{
  id: number;
  uuid: string;
  fName: string;
  lName: string;
  companyName: string | null;
  email: string;
}> => {
  const salts = 8;
  const newPass = hashedPasswordService(dataBody.password, salts);
  if (dataBody.password !== '') {
    dataBody.password = newPass;
  }

  const userExist = await db.users.findFirst({
    where: {
      email: dataBody.email,
    },
  });

  if (userExist) {
    next(new AppError('User already exists', 400));
  }

  const user = await db.users.create({
    data: {
      email: dataBody.email,
      fName: dataBody.fName,
      lName: dataBody.lName,
      companyName: dataBody.companyName,
      password: {
        create: {
          password: dataBody.password,
        },
      },
      role: {
        create: {
          name: 'USER',
        },
      },
    },
  });

  const tokenEmail = await createTokenVerificationService(
    { uuid: user.uuid },
    TokenType.EMAIL_VERIFICATION,
  );

  if (!tokenEmail) {
    next(new AppError('Token not created', 500));
  }

  sendEmail({
    email: 'bryantro855@gmail.com',
    subject: 'Email Verification',
    message: `Click the link to verify your email: ${process.env.CLIENT_URL}/verify-email/${tokenEmail}`,
  }).catch((err: string) => {
    next(new AppError(err, 500));
  });

  return user;
};
