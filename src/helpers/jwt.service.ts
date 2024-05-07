import { type JwtPayload, sign, verify } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

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
