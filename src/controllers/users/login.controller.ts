import { type Request, type Response } from 'express';
import { loginControllerService } from '../../services/auth';

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
  } catch (error) {
    res.status(401).json({
      status: 'failed',
      message: error,
    });
  }
};
