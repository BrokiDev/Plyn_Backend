import { Request, Response } from 'express';
import type { AppError } from '../utils/appError';

export const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
): void => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (err.message.includes('jwt expired')) {
    err.message = 'Unauthorized, please login again';
    err.statusCode = 401;
  }

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
