import express from 'express';

export const userRouter = express.Router();

userRouter.route('/register').get();
userRouter.route('/login').get();
userRouter.route('/forgot-password').get();
userRouter.route('/me').get();
