import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Middleware to handle errors.
 * Logs the error and sends a standardized JSON response.
 *
 * @param err - Error object
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error message and stack trace
  logger.error(err.message, err);

  // Send a standardized error response
  res
    .status(err.status || 500)
    .json({ error: err.message || 'Internal Server Error' });
};
