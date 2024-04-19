import { type Request, type Response } from 'express';
import { createUserService, getAllUserService } from '../../services/auth';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const getAllUser = async (req: Request, res: Response) => {
  try {
    const data = await getAllUserService();

    res.status(200).json({
      status: 'success',
      count: data.length,
      data,
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error,
    });
  }
};

export const createUser = async (
  { body }: Request,
  res: Response,
): Promise<void> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression, @typescript-eslint/no-unsafe-argument
    const data = await createUserService(body);

    res.status(200).json({
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
