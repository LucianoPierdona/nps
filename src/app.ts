import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import createConnection from './database';
import { router } from './routes';
import { AppError } from './errors/appError';

createConnection();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  return res.send('Hello World');
});

app.use(router);

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: 'Error',
    error: 'Internal Server Error',
  });
});

export { app };
