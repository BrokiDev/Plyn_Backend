/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createUser, getAllUser, loginController } from '../controllers/users';

export const userRouter = Router();

userRouter.route('/register').post(createUser);
userRouter.route('/login').post(loginController);
userRouter.route('/forgot-password').get();
userRouter.route('/me').get(getAllUser);
