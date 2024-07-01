/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { authRouter } from './auth';
import { userRouter } from './user/userRoutes';

export const Routes = {
  auth: authRouter,
  user: userRouter,
};
