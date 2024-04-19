import express from 'express';
import { createUser, getAllUser } from '../controllers/userController';

export const userRouter = express.Router();

// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.route('/register').post(createUser);
userRouter.route('/login').post();
userRouter.route('/forgot-password').get();
// eslint-disable-next-line @typescript-eslint/no-misused-promises
userRouter.route('/me').get(getAllUser);
