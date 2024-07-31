import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';

import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import jobRouter from './routes/jobRouter';
import { logger } from './utils/logger';
import { helmetConfig } from './config/helmetConfig';
import { auth } from './middlewares/auth';
import { errorHandler } from './middlewares/errorHandler';
import swaggerOptions from './config/swaggerConfig';
import cors from 'cors';

/// Load environment variables from .env file
const result = dotenv.config();
if (result.error) {
  throw result.error;
}
// Split CORS allowed origins into an array
const allowedOrigins = process.env.CORS_ALLOWED_ORIGINS?.split(',') || [];

// Initialize Express app
const app = express();
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Middleware setup
app.use(express.json()); // Parse incoming JSON requests
app.use(helmet(helmetConfig)); // Set security-related HTTP headers

// CORS configuration
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
  })
);

// Swagger UI setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec)); // Swagger UI

// Apply rate limiting, authentication, and job routes under /api/v1
app.use('/api/v1', auth, jobRouter);

// Error handler should be the last middleware
app.use(errorHandler);

// Define port from environment variable or default to 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
