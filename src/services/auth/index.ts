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
  const user = db.users.create({
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
  const Response = await user;
  return Response;
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

  if (user == null) {
    next(new AppError('Invalid Credentials', 401));
  }

  const isPasswordValid = verifyPasswordService(
    password,
    `${validPassword?.password}`,
  );

  if (!isPasswordValid) {
    next(new AppError('Invalid Credentials', 401));
  }

  const token = generateToken(email);

  const data = {
    token,
    user: {
      email: `${user?.email}`,
    },
  };
  return data;
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
