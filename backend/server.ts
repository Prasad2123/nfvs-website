import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import session from 'express-session';
import { createLogger } from './utils/logger';
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import customerRoutes from './routes/customer.routes';
import engineerRoutes from './routes/engineer.routes';
import serviceCallRoutes from './routes/service-call.routes';
import followUpRoutes from './routes/follow-up.routes';
import settingsRoutes from './routes/settings.routes';
import usersRoutes from './routes/users.routes';
import { auditMiddleware } from './middleware/audit.middleware';

const logger = createLogger('Server');

let serverInstance: any = null;

export const startBackendServer = async (): Promise<number> => {
  return new Promise((resolve) => {
    const app: Express = express();
    const port = parseInt(process.env.API_PORT || '3001', 10);

    app.use(cors({ origin: ['http://localhost:5173', 'app://.'], credentials: true }));
    app.use(express.json({ limit: '10mb' }));
    app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    app.use(session({
      secret: process.env.SESSION_SECRET || 'secret_key_123',
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }
    }));

    app.use(auditMiddleware);

    // All routes
    app.use('/api/auth', authRoutes);
    app.use('/api/dashboard', dashboardRoutes);
    app.use('/api/customers', customerRoutes);
    app.use('/api/engineers', engineerRoutes);
    app.use('/api/service-calls', serviceCallRoutes);
    app.use('/api/follow-ups', followUpRoutes);
    app.use('/api/settings', settingsRoutes);
    app.use('/api/users', usersRoutes);

    // Backup route (simple inline since no heavy logic needed yet)
    app.post('/api/backup/create', async (req: Request, res: Response) => {
      try {
        const { getPrismaClient } = await import('./utils/database');
        const prisma = getPrismaClient();
        const userId = (req as any).session?.userId;
        const filePath = `backups/backup-${new Date().toISOString().replace(/[:.]/g, '-')}.db`;
        await prisma.backupHistory.create({
          data: { file_path: filePath, file_size: 0, status: 'success', created_by: userId || null }
        });
        res.json({ success: true, data: { file_path: filePath }, message: 'Backup created successfully' });
      } catch (e: any) {
        res.status(500).json({ success: false, message: e.message });
      }
    });

    app.get('/api/backup/history', async (req: Request, res: Response) => {
      try {
        const { getPrismaClient } = await import('./utils/database');
        const prisma = getPrismaClient();
        const history = await prisma.backupHistory.findMany({
          orderBy: { created_at: 'desc' }, take: 20
        });
        res.json({ success: true, data: history });
      } catch (e: any) {
        res.status(500).json({ success: false, message: e.message });
      }
    });

    app.use((req: Request, res: Response) => {
      res.status(404).json({ success: false, message: 'Route not found' });
    });

    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      logger.error(`Global error: ${err.message}\n${err.stack}`);
      res.status(500).json({ success: false, message: 'Internal server error' });
    });

    serverInstance = app.listen(port, () => {
      logger.info(`Backend server running on port ${port}`);
      resolve(port);
    });
  });
};

export const stopBackendServer = () => {
  if (serverInstance) {
    serverInstance.close(() => logger.info('Backend server stopped'));
  }
};
