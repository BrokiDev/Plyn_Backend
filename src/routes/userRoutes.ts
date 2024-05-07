/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createUser, getAllUser, loginController } from '../controllers/users';
import { checkJwt } from '../middlewares/checkJwt';
import { checkPermission } from '../middlewares/checkPermission';

export const userRouter = Router();

userRouter.route('/register').post(createUser);
userRouter.route('/login').post(loginController);
userRouter.route('/forgot-password').get();
userRouter.route('/me').get(checkJwt, checkPermission('ADMIN'), getAllUser);
