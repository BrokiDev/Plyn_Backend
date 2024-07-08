/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type JwtPayload, sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import type { Response, Request } from 'express';
import { encryptCookie } from './encrypt.service';
import { AppError } from '../utils/appError';

dotenv.config({ path: '.env' });

interface JwtPayloadExt extends JwtPayload {
  userId?: string;
}

interface cookieOptionsI {
  httpOnly: boolean;
  secure: boolean;
  maxAge: number;
  sameSite: string;
  expires: Date;
}

const JWT_SECRET = `${process.env.JWT_SECRET}`;
const JWT_EXPIRE_IN = `${process.env.JWT_EXPIRE_IN}`;
export const generateToken = (userId: string): string => {
  return sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
};

export const verifyToken = (token: string): JwtPayloadExt => {
  if (!token) {
    return new AppError('Please log in', 401);
  }
  const tokenReceived = verify(token, JWT_SECRET) as JwtPayloadExt;

  if (tokenReceived.exp === undefined) {
    return new AppError('Invalid token', 401);
  }

  const tokenExp = tokenReceived.exp * 1000;
  const now = Date.now();

  if (tokenExp < now) {
    return new AppError('Unauthorized, please login again', 401);
  }

  return tokenReceived;
};

export const sendTokenByCookie = (res: Response, token: string) => {
  const encryptedValue = encryptCookie(token);
  const cookieOptions: cookieOptionsI = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 1,
    sameSite: 'strict',
    expires: new Date(Date.now() + 1000 * 60 * 60 * 1),
  };
  res.cookie('SessionToken', encryptedValue, cookieOptions as object);
};

export const getTokenFromCookie = (req: Request): string => {
  return req.cookies.SessionToken;
};
export const sendTokenByHeader = (res: Response, token: string): void => {
  res.setHeader('Authorization', `Bearer ${token}`);
};
