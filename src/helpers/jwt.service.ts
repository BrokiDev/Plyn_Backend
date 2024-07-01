import { type JwtPayload, sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import type { Response, Request } from 'express';
import { encryptCookie } from './encrypt.service';

dotenv.config({ path: '.env' });

interface JwtPayloadExt extends JwtPayload {
  userId?: string;
}

const JWT_SECRET = `${process.env.JWT_SECRET}`;
const JWT_EXPIRE_IN = `${process.env.JWT_EXPIRE_IN}`;
export const generateToken = (userId: string): string => {
  return sign({ userId }, JWT_SECRET, { expiresIn: JWT_EXPIRE_IN });
};

export const verifyToken = (token: string): JwtPayloadExt => {
  return verify(token, JWT_SECRET) as JwtPayloadExt;
};

export const sendTokenByCookie = (res: Response, token: string): void => {
  const encryptedValue = encryptCookie(token);
  res.cookie('SessionToken', encryptedValue, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: 'strict',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });
};

export const getTokenFromCookie = (req: Request): string => {
  return req.cookies.SessionToken;
};
export const sendTokenByHeader = (res: Response, token: string): void => {
  res.setHeader('Authorization', `Bearer ${token}`);
};
