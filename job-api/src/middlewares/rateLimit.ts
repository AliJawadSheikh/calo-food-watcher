import expressRateLimit from 'express-rate-limit';

/**
 * Rate limiting middleware.
 * Limits each IP to a maximum number of requests within a specified time window.
 */
export const rateLimiter = expressRateLimit({
  windowMs: 1 * 60 * 60 * 1000, // 1 hour
  max: 50, // limit each IP to 50 requests per windowMs i.e 1hr
  handler: (req, res) => {
    res.status(429).json({
      message: 'Too many requests from this IP, please try again later.',
    });
  },
});
