/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import cors from 'cors';
import type { NextFunction, Request, Response } from 'express';
import { errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';
// import { authRouter } from './routes/auth';
import { Routes } from './routes';
import { setupSwagger } from './swagger';
import { AppError } from './utils/appError';
import { sendEmail } from './utils/Emails';

dotenv.config({ path: '.env' });

const { PORT } = process.env;

export const app = express();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    origin: [process.env.FRONTEND_URL, process.env.URL],
  }),
);

setupSwagger(app);

app.use('/api/v1/auth', Routes.auth);

app.post('/contact', async (req: Request, res: Response) => {
  try {
    const { name, email, message } = req.body;

    await sendEmail({
      email: 'bryantro855@gmail.com',
      subject: `New message from ${name} <${email}>`,
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Message sent successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Message not sent',
    });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new AppError(
    `Can't find ${req.originalUrl} on this server!`,
    404,
  );
  next(err);
});

process.on('unhandledRejection', (err: any) => {
  console.log(err.name, err.message);
});

process.on('uncaughtException', (err: any) => {
  console.log(err.name, err.message);
});

app.use(errorHandler);
