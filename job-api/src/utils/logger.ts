import winston from 'winston';
import { format } from 'winston';

// Define custom logging levels and colors
const customLevels = {
  levels: {
    fatal: 0,
    error: 1,
    warn: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'magenta',
    debug: 'white',
  },
};

// Add colors to Winston
winston.addColors(customLevels.colors);

// Define a custom log format
const customFormat = format.printf(({ timestamp, level, message, pid }) => {
  return `${timestamp} [${pid}][${level.toUpperCase()}] ${message}`;
});

const logger = winston.createLogger({
  levels: customLevels.levels, // Use custom levels
  level: process.env.LOGGER_LEVEL || 'debug', // Default log level
  format: format.combine(
    format.timestamp({ format: 'ddd MMM DD HH:mm:ss YYYY' }), // Timestamp format
    format.splat(), // Enable string interpolation
    format.printf(({ timestamp, level, message }) => {
      const pid = process.pid;
      return `${timestamp} [${pid}][${level.toUpperCase()}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.File({
      filename: 'logs/app.log',
      format: format.combine(
        format.timestamp({ format: 'ddd MMM DD HH:mm:ss YYYY' }), // Timestamp format for file
        format.splat(),
        format.printf(({ timestamp, level, message }) => {
          const pid = process.pid;
          return `${timestamp} [${pid}][${level.toUpperCase()}] ${message}`;
        })
      ),
    }),
    new winston.transports.Console({
      format: format.combine(
        format.colorize({ all: true }), // Colorize all log levels for console
        customFormat
      ),
    }),
  ],
});

export { logger };
