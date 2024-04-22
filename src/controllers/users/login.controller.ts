import { type Request, type Response } from 'express';
import { loginControllerService } from '../../services/auth';
import type { ResponseI } from '../../interfaces/Response.interface';

interface Login {
  email: string;
  password: string;
}

export const loginController = async (
  { body }: Request,
  res: Response,
): Promise<void> => {
  try {
    const { email, password }: Login = body;
    const data = await loginControllerService(email, password);
    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (e) {
    const error = e as ResponseI;
    res.status(401).json({
      status: 'failed',
      message: error.message,
    });
  }
};
