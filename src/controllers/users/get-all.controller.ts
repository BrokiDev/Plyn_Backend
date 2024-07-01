import type { Request, Response } from 'express';
import { getAllUserService } from '../../services/user/get-all.service';

export const getAllUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
