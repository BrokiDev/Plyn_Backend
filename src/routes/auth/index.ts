import { Router } from 'express';
import {
  forgotPasswordController,
  meController,
  verifyEmailController,
  signUpController,
  signInController,
  logoutController,
  resendVerificationEmailController,
} from '../../controllers/auth';

export const authRouter = Router();

authRouter.route('/sign-up').post(signUpController);
authRouter.route('/sign-in').post(signInController);
authRouter.route('/forgot-password').post(forgotPasswordController);
authRouter.route('/verify-email/:token').patch(verifyEmailController);
authRouter.route('/reset-password/:token').patch();
authRouter.route('/me').get(meController);
authRouter.route('/sign-out').get(logoutController);
authRouter.route('/refresh-token').get();
authRouter
  .route('/resend-verification-email')
  .post(resendVerificationEmailController);
