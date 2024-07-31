import { NextFunction, Response, Request } from 'express';
import jwt from 'jsonwebtoken';
import { extractToken } from '../utils/extractToken';
import { logger } from '../utils/logger';

/**
 * Middleware to authenticate requests using JWT.
 * Verifies the token and checks the user ID for authorization.
 *
 * @param req - Express request object
 * @param res - Express response object
 * @param next - Express next middleware function
 */
export const auth = (req: Request, res: Response, next: NextFunction) => {
  const { authorization: authToken } = req.headers;

  // Check if authorization token is provided
  if (authToken) {
    const token = extractToken(authToken);

    // Verify the token
    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
      async (err: any, decoded: any) => {
        if (err) {
          logger.warn('Unauthorized access attempt: Invalid token');
          return res.status(401).json({
            message: 'You are not authorized to perform this action.',
          });
        }

        // Check if decoded payload is valid and not a string
        if (decoded && typeof decoded !== 'string') {
          if (decoded.USER_ID !== process.env.USER_ID) {
            logger.warn('Unauthorized access attempt: Invalid user ID');
            return res.status(401).json({
              message: 'You are not authorized to perform this action.',
            });
          }
        }

        // Proceed to the next middleware if authorized
        next();
      }
    );
  } else {
    logger.warn('Unauthorized access attempt: No token provided');
    return res.status(401).json({
      message: 'You are not authorized to perform this action.',
    });
  }
};
