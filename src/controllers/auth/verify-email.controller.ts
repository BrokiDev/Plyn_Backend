/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import type { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../../helpers/catchAsync';
import { verifyEmailService } from '../../services/auth/verify-email.service';
import { sendTokenByCookie } from '../../helpers/jwt.service';

export const verifyEmailController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.params.token;
    const data = await verifyEmailService(token, next);
    const tokenSend = sendTokenByCookie(res, data);
    res.status(200).json({
      status: 'success',
      message: 'Email Verified Successfully',
      token: tokenSend,
    });
  },
);
