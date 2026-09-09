import { Request, Response, NextFunction } from 'express';
import { getPrismaClient } from '../utils/database';
import { createLogger } from '../utils/logger';

const logger = createLogger('AuditMiddleware');

export const auditMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const methodsToAudit = ['POST', 'PUT', 'PATCH', 'DELETE'];

  if (!methodsToAudit.includes(req.method)) {
    return next();
  }

  res.on('finish', async () => {
    if (!req.session?.userId) return;
    
    try {
      const prisma = getPrismaClient();
      let entityType = req.path.split('/')[1] || 'unknown';
      let entityId = null;

      const pathParts = req.path.split('/');
      if (pathParts.length > 2 && !isNaN(Number(pathParts[2]))) {
        entityId = Number(pathParts[2]);
      }

      await prisma.auditLog.create({
        data: {
          user_id: req.session.userId,
          action: req.method,
          entity_type: entityType,
          entity_id: entityId,
          description: `User performed ${req.method} on ${req.originalUrl}`,
          old_values: null,
          new_values: req.method !== 'DELETE' ? JSON.stringify(req.body) : null
        }
      });
    } catch (error: any) {
      logger.error(`Failed to create audit log: ${error.message}`);
    }
  });

  next();
};
