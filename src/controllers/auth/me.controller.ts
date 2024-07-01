import type { Response, NextFunction } from 'express';
import { catchAsync } from '../../helpers/catchAsync';
import type { RequestExt } from '../../interfaces/ReqExt';
import { meService } from '../../services/auth/me.service';

export const meController = catchAsync(
  async (req: RequestExt, res: Response, next: NextFunction) => {
    const userLogged = await meService(req, next);
    res.status(200).json({
      status: 'success',
      data: userLogged,
    });
  },
);
