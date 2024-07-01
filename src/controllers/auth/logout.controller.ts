/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type { NextFunction, Response } from 'express';
import { catchAsync } from '../../helpers/catchAsync';
import type { RequestExt } from '../../interfaces/ReqExt';
import { logoutService } from '../../services/auth/logout.service';

export const logoutController = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const token: string = req.cookies.SessionToken;
    await logoutService(token, next);
    res.clearCookie('SessionToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.status(200).json({
      status: 'success',
      message: 'Logout Successfully',
    });
  },
);
