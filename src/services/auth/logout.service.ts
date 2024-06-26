/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type { NextFunction } from 'express';
import { AppError } from '../../utils/appError';

export const logoutService = async (
  token: string,
  next: NextFunction,
): Promise<void> => {
  if (!token) {
    next(new AppError('You are not logged in', 401));
  }
};
