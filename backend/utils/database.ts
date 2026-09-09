import { PrismaClient } from '@prisma/client';
import { createLogger } from './logger';

const logger = createLogger('Database');

let prismaClient: PrismaClient | null = null;

export const getPrismaClient = (): PrismaClient => {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      log: [
        { emit: 'stdout', level: 'error' },
        { emit: 'stdout', level: 'warn' },
      ],
    });

    logger.info('Prisma client initialized');
  }
  return prismaClient;
};

export const disconnectDatabase = async (): Promise<void> => {
  if (prismaClient) {
    await prismaClient.$disconnect();
    prismaClient = null;
    logger.info('Database disconnected successfully');
  }
};
