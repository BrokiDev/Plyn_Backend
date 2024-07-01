/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../helpers/catchAsync';
import { AppError } from '../../utils/appError';
import { forgotPasswordService } from '../../services/auth/forgot-password.service';

export const forgotPasswordController = catchAsync(
  async ({ body }: Request, res: Response, next: NextFunction) => {
    const email: string = body.email;

    if (!email) {
      return next(new AppError('Please provide an email', 400));
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      return next(new AppError('Please provide a valid email', 400));
    }
    const emailFound = await forgotPasswordService(email, next);
    res.status(200).json({
      status: 'success',
      message:
        'If your Email is in our database. you gonna receive a new email to reset your password',
    });
  },
);
