import { Router, Request, Response } from 'express';
import { getPrismaClient } from '../utils/database';
import { createLogger } from '../utils/logger';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();
const logger = createLogger('follow-up-routes');

router.get('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const status = req.query.status as string;
    
    const prisma = getPrismaClient();
    const where: any = {};
    if (status) where.status = status;

    const skip = (page - 1) * limit;
    
    const [followUps, total] = await Promise.all([
      prisma.followUp.findMany({
        where,
        skip,
        take: limit,
        include: {
          call: { select: { call_number: true, customer: { select: { name: true } } } },
          creator: { select: { full_name: true } },
          completer: { select: { full_name: true } }
        },
        orderBy: { scheduled_date: 'asc' }
      }),
      prisma.followUp.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        followUps,
        pagination: { total, page, limit, totalPages: Math.ceil(total / limit) }
      }
    });
  } catch (error: any) {
    logger.error(`Error fetching follow-ups: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/today', requireAuth, async (req: Request, res: Response) => {
  try {
    const prisma = getPrismaClient();
    const today = new Date().toISOString().split('T')[0];
    
    const followUps = await prisma.followUp.findMany({
      where: {
        scheduled_date: { startsWith: today },
        status: 'pending'
      },
      include: {
        call: { select: { call_number: true, customer: { select: { name: true, phone: true } } } }
      },
      orderBy: { created_at: 'desc' }
    });

    res.json({ success: true, data: followUps });
  } catch (error: any) {
    logger.error(`Error fetching today follow-ups: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const prisma = getPrismaClient();
    const followUp = await prisma.followUp.findUnique({
      where: { id },
      include: { call: true }
    });
    
    if (!followUp) return res.status(404).json({ success: false, message: 'Follow-up not found' });
    res.json({ success: true, data: followUp });
  } catch (error: any) {
    logger.error(`Error fetching follow-up: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/', requireAuth, async (req: Request, res: Response) => {
  try {
    const { call_id, scheduled_date, notes } = req.body;
    const userId = (req as any).user.id;
    const prisma = getPrismaClient();

    const followUp = await prisma.followUp.create({
      data: {
        call_id,
        scheduled_date,
        notes,
        created_by: userId,
        status: 'pending'
      }
    });

    res.status(201).json({ success: true, data: followUp, message: 'Follow-up scheduled' });
  } catch (error: any) {
    logger.error(`Error creating follow-up: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.put('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { scheduled_date, notes, status } = req.body;
    const prisma = getPrismaClient();

    const followUp = await prisma.followUp.update({
      where: { id },
      data: { scheduled_date, notes, status }
    });

    res.json({ success: true, data: followUp, message: 'Follow-up updated' });
  } catch (error: any) {
    logger.error(`Error updating follow-up: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.patch('/:id/complete', requireAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userId = (req as any).user.id;
    const prisma = getPrismaClient();

    const followUp = await prisma.followUp.update({
      where: { id },
      data: { 
        status: 'completed',
        completed_by: userId
      }
    });

    res.json({ success: true, data: followUp, message: 'Follow-up marked as completed' });
  } catch (error: any) {
    logger.error(`Error completing follow-up: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
