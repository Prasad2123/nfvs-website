import winston from 'winston';
import path from 'path';
import fs from 'fs';

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp: ts, stack, module: mod }: any) => {
  return `${ts} [${mod || 'app'}] ${level}: ${stack || message}`;
});

export const createLogger = (module: string) => {
  const isDev = process.env.NODE_ENV !== 'production';

  return winston.createLogger({
    level: isDev ? 'debug' : 'info',
    format: combine(
      timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      errors({ stack: true }),
      winston.format.splat(),
      winston.format.json()
    ),
    defaultMeta: { module },
    transports: [
      new winston.transports.Console({
        format: combine(
          colorize(),
          logFormat
        )
      }),
      new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        format: combine(timestamp(), winston.format.json())
      }),
      new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        format: combine(timestamp(), winston.format.json())
      })
    ]
  });
};
