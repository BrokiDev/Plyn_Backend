/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { userRouter } from './routes/userRoutes';
import cors from 'cors';
import type { Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';

dotenv.config({ path: '.env' });

const { PORT } = process.env;

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/auth', userRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server Listening in port ${PORT}...`);
});

app.all('*', (req: Request, res: Response) => {
  throw new Error(`Can't find the route ${req.originalUrl} on this server`);
});

process.on('unhandledRejection', (err: any) => {
  console.log(err.name, err.message);
});

process.on('uncaughtException', (err: any) => {
  console.log(err.name, err.message);
});

app.use(errorHandler);
