import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const { PORT } = process.env;

export const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server Listening in port ${PORT}...`);
});
