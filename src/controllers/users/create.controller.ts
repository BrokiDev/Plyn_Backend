import type { Request, Response } from 'express';
import { createUserService } from '../../services/auth';
import type { User } from '../../interfaces/Users.interface';

export const createUser = async (
  { body }: Request,
  res: Response,
): Promise<void> => {
  try {
    const createdUser: User = { ...body };
    const data = await createUserService(createdUser);

    res.status(201).json({
      status: 'Success',
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};
