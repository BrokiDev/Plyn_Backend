/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-unused-vars */

import type { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../../helpers/catchAsync';
import { updateUserPasswordService } from '../../services/user/update-password.service';

interface BodyI {
  password: string;
}

export const updatePasswordController = catchAsync(
  async (
    { body, params }: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const uuid = params.uuid;
    const { password }: BodyI = body;
    const passwordUpdated = await updateUserPasswordService(
      uuid,
      password,
      next,
    );
    res.status(200).json({
      status: 'success',
      message: 'Password Updated Successfully',
    });
  },
);
