import express from 'express';

const userRouter = express.Router();

userRouter.route('/').get();
