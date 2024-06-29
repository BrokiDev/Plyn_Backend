/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { createUser, getAllUser, loginController } from '../controllers/users';
import { checkJwt } from '../middlewares/checkJwt';
import { checkPermission } from '../middlewares/checkPermission';
import { updatePasswordController } from '../controllers/users/update-password.controller';
import { verifyEmailController } from '../controllers/auth/verify-email.controller';
import { forgotPasswordController } from '../controllers/auth/forgot-password.controller';

export const userRouter = Router();

userRouter.route('/register').post(createUser);
userRouter.route('/login').post(loginController);
userRouter.route('/forgot-password').post(forgotPasswordController);
userRouter.route('/me').get(checkJwt, checkPermission('ADMIN'), getAllUser);
userRouter
  .route('/update-password/:uuid')
  .patch(checkJwt, updatePasswordController);

userRouter.route('/verify-email/:token').patch(verifyEmailController);
userRouter.route('/reset-password/:token').patch();
