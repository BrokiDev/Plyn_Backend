import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/jwt.service';

export const checkJwt = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response<unknown, Record<string, unknown>> | undefined => {
  try {
    const jwtByUser = req.headers.authorization;
    const jwt = jwtByUser?.split(' ').pop();
    const validateToken = verifyToken(`${jwt}`);

    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (!validateToken)
      return res.status(401).json({
        status: 'Unathorized',
        message: "you don't have access to this route",
      });
    else {
      next();
    }
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};
