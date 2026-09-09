import { Router, Request, Response } from 'express';
import { getPrismaClient } from '../utils/database';
import { createLogger } from '../utils/logger';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();
const logger = createLogger('settings-routes');

router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const prisma = getPrismaClient();
    const settings = await prisma.setting.findMany();
    
    const settingsObj = settings.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    res.json({ success: true, data: settingsObj });
  } catch (error: any) {
    logger.error(`Error fetching settings: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/company', requireAuth, async (req: Request, res: Response) => {
  try {
    const prisma = getPrismaClient();
    const settings = await prisma.setting.findMany({
      where: {
        key: { startsWith: 'company_' }
      }
    });
    
    const settingsObj = settings.reduce((acc: any, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    res.json({ success: true, data: settingsObj });
  } catch (error: any) {
    logger.error(`Error fetching company settings: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.put('/', requireAuth, requireRole('Super Admin'), async (req: Request, res: Response) => {
  try {
    const settingsData = req.body; // Expects an object { key: value, key2: value2 }
    const prisma = getPrismaClient();
    const userId = (req as any).user.id;

    await prisma.$transaction(async (tx) => {
      for (const [key, value] of Object.entries(settingsData)) {
        await tx.setting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) }
        });
      }
    });

    await prisma.auditLog.create({
      data: {
        user_id: userId,
        action: 'update',
        entity_type: 'settings',
        description: 'System settings updated'
      }
    });

    res.json({ success: true, message: 'Settings updated successfully' });
  } catch (error: any) {
    logger.error(`Error updating settings: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
