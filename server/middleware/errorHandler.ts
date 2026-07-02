import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error Handler]', err);

  const statusCode = err.status || err.statusCode || 500;
  const response: ApiResponse = {
    success: false,
    error: err.message || 'Internal Server Error',
    message: err.message || 'Ocorreu um erro interno no servidor Lumen Studio.'
  };

  res.status(statusCode).json(response);
};
