/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { NextFunction } from 'express';
import { generateToken } from '../../helpers/jwt.service';
import { AppError } from '../../utils/appError';
import { db } from '../../utils/db.server';
import { createHash } from 'crypto';

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
