import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { userRouter } from './routes/userRoutes';
import cors from 'cors';

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
