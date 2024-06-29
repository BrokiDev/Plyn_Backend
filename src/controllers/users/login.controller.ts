import type { NextFunction, Request, Response } from 'express';
import { loginControllerService } from '../../services/auth';
import { catchAsync } from '../../helpers/catchAsync';

interface Login {
  email: string;
  password: string;
}

export const loginController = catchAsync(
  async (
    { body }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const { email, password }: Login = body;
    const data = await loginControllerService(email, password, next);
    res.status(200).json({
      status: 'success',
      token: data.token,
      user: data.user,
    });
  },
);
