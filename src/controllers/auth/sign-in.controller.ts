/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import type { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../helpers/catchAsync';
import { sendTokenByCookie } from '../../helpers/jwt.service';
import { signInService } from '../../services/auth/sign-in.service';

interface Login {
  email: string;
  password: string;
}

export const signInController = catchAsync(
  async (
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { email, password }: Login = body;
    const data = await signInService(email, password, next);
    const token = sendTokenByCookie(res, data.token);
    res.status(200).json({
      status: 'success',
      token,
      data: data.user,
    });
  },
);
