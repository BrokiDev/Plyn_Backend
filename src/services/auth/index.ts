/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import {
  hashedPasswordService,
  verifyPasswordService,
} from '../../helpers/encrypt.service';
import { db } from '../../utils/db.server';
import { type User } from '../../interfaces/Users.interface';
import { generateToken } from '../../helpers/jwt.service';
import type { NextFunction } from 'express';
import { AppError } from '../../utils/appError';
import { createTokenVerificationService, TokenType } from '../token';
import { sendEmail } from '../../utils/Emails';
import { createHash } from 'crypto';

export const createUserService = async (
  dataBody: User,
): Promise<{
  id: number;
  uuid: string;
  fName: string;
  lName: string;
  companyName: string | null;
  email: string;
}> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const salts = 8;
  const newPass = hashedPasswordService(dataBody.password, salts);
  if (dataBody.password !== '') {
    dataBody.password = newPass;
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
          name: dataBody.role,
        },
      },
    },
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const tokenEmail = await createTokenVerificationService(
    { uuid: user.uuid },
    TokenType.EMAIL_VERIFICATION,
  );

  if (!tokenEmail) {
    throw new AppError('Token not created', 500);
  }

  sendEmail({
    email: 'bryantro855@gmail.com',
    subject: 'Email Verification',
    message: `Click the link to verify your email: ${process.env.CLIENT_URL}/verify-email/${tokenEmail}`,
  }).catch((err: string) => {
    throw new AppError(err, 500);
  });

  return user;
};

export const getAllUserService = async (): Promise<
  Array<{
    id: number;
    uuid: string;
    fName: string;
    lName: string;
    companyName: string | null;
    email: string;
  }>
> => {
  const data = db.users.findMany();
  const response = await data;
  return response;
};

export const loginControllerService = async (
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

export const updateUserPasswordService = async (
  uuid: string,
  body: string,
  next: NextFunction,
): Promise<void> => {
  const salts = 8;
  const newPass = hashedPasswordService(body, salts);

  const user = await db.users.findFirst({
    where: { uuid },
  });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const oldPass = await db.user_passwords.findFirst({
    where: {
      userId: user.uuid,
      active: true,
    },
  });

  if (oldPass) {
    const isPasswordValid = verifyPasswordService(body, `${oldPass.password}`);
    if (isPasswordValid) {
      next(new AppError('Password must not be the same as the old one', 400));
    }
    await db.user_passwords.update({
      where: {
        uuid: oldPass?.uuid,
      },
      data: {
        active: false,
        updateAt: new Date(),
      },
    });
  }

  const newPassword = await db.user_passwords.create({
    data: {
      password: newPass,
      active: true,
      createdAt: new Date(),
      userId: user.uuid,
    },
  });
};

export const verifyEmailService = async (
  token: string,
  next: NextFunction,
): Promise<string> => {
  const hashedToken = createHash('sha256').update(token).digest('hex');
  const tokenData = await db.user_tokens.findFirst({
    where: {
      token: hashedToken,
      type: 'EMAIL_VERIFICATION',
      used: false,
      expiredAt: {
        gte: new Date(),
      },
    },
  });

  if (!tokenData) {
    next(new AppError('Invalid or expired token', 400));
  }

  if (tokenData?.used) {
    next(new AppError('Token already used', 400));
  }

  await db.user_tokens.update({
    where: {
      uuid: `${tokenData?.uuid}`,
    },
    data: {
      used: true,
      usedAt: new Date(),
    },
  });

  const user = await db.users.update({
    where: {
      uuid: `${tokenData?.userId}`,
    },
    data: {
      active: true,
      updateAt: new Date(),
    },
  });

  const tokenJwt = generateToken(`${user.email}`);

  return tokenJwt;
};

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
