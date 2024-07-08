import type { Request, Response, NextFunction } from 'express';

export const catchAsync = (fn) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next);

    if (fn instanceof Promise) {
      return fn.catch(next);
    }
  };
};
