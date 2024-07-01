import type { NextFunction, Request, Response } from 'express';
import type { User } from '../../interfaces/Users.interface';
import { signUpService } from '../../services/auth/sign-up.service';
import { catchAsync } from '../../helpers/catchAsync';

export const signUpController = catchAsync(
  async ({ body }: Request, res: Response, next: NextFunction) => {
    const createdUser: User = { ...body };
    const data = await signUpService(createdUser, next);

    res.status(201).json({
      status: 'Success',
      data,
    });
  },
);
