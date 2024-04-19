import { type JwtPayload, sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? 'Token02109';

export const generateToken = (userId: string): string => {
  return sign({ userId }, JWT_SECRET, { expiresIn: '1h' });
};

export const verifyToken = (token: string): string | JwtPayload => {
  return verify(token, JWT_SECRET);
};
