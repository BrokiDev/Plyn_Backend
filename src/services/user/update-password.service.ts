/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction } from 'express';
import {
  hashedPasswordService,
  verifyPasswordService,
} from '../../helpers/encrypt.service';
import { AppError } from '../../utils/appError';
import { db } from '../../utils/db.server';

export const updateUserPasswordService = async (
  uuid: string,
  body: string,
  next: NextFunction,
) => {
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
      return next(
        new AppError('Password must not be the same as the old one', 400),
      );
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
