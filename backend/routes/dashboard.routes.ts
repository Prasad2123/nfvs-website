import { Router } from 'express';
import { requireAuth } from '../middleware/auth.middleware';
import { getPrismaClient } from '../utils/database';

const router = Router();

router.get('/stats', requireAuth, async (req, res) => {
  try {
    const prisma = getPrismaClient();
    const today = new Date().toISOString().split('T')[0];

    const [
      today_calls,
      pending_calls,
      completed_calls,
      cancelled_calls,
      total_customers,
      engineers_count,
      followups_today,
      missed_followups,
      available_engineers
    ] = await Promise.all([
      prisma.serviceCall.count({ where: { date: today } }),
      prisma.serviceCall.count({ where: { status: { notIn: ['completed', 'cancelled', 'closed'] } } }),
      prisma.serviceCall.count({ where: { status: 'completed' } }),
      prisma.serviceCall.count({ where: { status: 'cancelled' } }),
      prisma.customer.count({ where: { is_active: true } }),
      prisma.engineer.count({ where: { is_active: true } }),
      prisma.followUp.count({ where: { scheduled_date: today } }),
      prisma.followUp.count({ where: { scheduled_date: { lt: today }, status: 'pending' } }),
      prisma.engineer.count({ where: { status: 'available', is_active: true } })
    ]);

    res.json({
      success: true,
      data: {
        today_calls,
        pending_calls,
        completed_calls,
        cancelled_calls,
        total_customers,
        engineers_count,
        available_engineers,
        followups_today,
        missed_followups
      }
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/recent-calls', requireAuth, async (req, res) => {
  try {
    const prisma = getPrismaClient();
    const calls = await prisma.serviceCall.findMany({
      take: 10,
      orderBy: { created_at: 'desc' },
      include: {
        customer: { select: { name: true } },
        engineer: { select: { name: true } }
      }
    });
    res.json({ success: true, data: calls });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/follow-ups-today', requireAuth, async (req, res) => {
  try {
    const prisma = getPrismaClient();
    const today = new Date().toISOString().split('T')[0];
    const followUps = await prisma.followUp.findMany({
      where: { scheduled_date: today },
      orderBy: { scheduled_date: 'asc' },
      include: {
        call: {
          include: {
            customer: { select: { name: true } }
          }
        }
      },
      take: 10
    });
    res.json({ success: true, data: followUps });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/monthly-chart', requireAuth, async (req, res) => {
  try {
    const prisma = getPrismaClient();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const calls = await prisma.serviceCall.findMany({
      where: { created_at: { gte: sixMonthsAgo } },
      select: { created_at: true, status: true }
    });

    // Build last 6 months labels
    const months: Record<string, { name: string; Total: number; Completed: number; Pending: number }> = {};
    for (let i = 5; i >= 0; i--) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const name = d.toLocaleString('default', { month: 'short' });
      months[key] = { name, Total: 0, Completed: 0, Pending: 0 };
    }

    calls.forEach(call => {
      const key = `${call.created_at.getFullYear()}-${String(call.created_at.getMonth() + 1).padStart(2, '0')}`;
      if (months[key]) {
        months[key].Total += 1;
        if (call.status === 'completed') months[key].Completed += 1;
        else months[key].Pending += 1;
      }
    });

    res.json({ success: true, data: Object.values(months) });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/engineer-status', requireAuth, async (req, res) => {
  try {
    const prisma = getPrismaClient();
    const engineers = await prisma.engineer.findMany({
      where: { is_active: true },
      select: { status: true }
    });

    const statusCounts = { available: 0, busy: 0, on_leave: 0 };
    engineers.forEach(eng => {
      if (eng.status === 'available') statusCounts.available++;
      else if (eng.status === 'busy') statusCounts.busy++;
      else if (eng.status === 'on_leave') statusCounts.on_leave++;
    });

    const data = [
      { name: 'Available', value: statusCounts.available, color: '#16a34a' },
      { name: 'Busy', value: statusCounts.busy, color: '#f59e0b' },
      { name: 'On Leave', value: statusCounts.on_leave, color: '#dc2626' },
    ];

    res.json({ success: true, data });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
