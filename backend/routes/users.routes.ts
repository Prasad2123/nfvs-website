import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { getPrismaClient } from '../utils/database';
import { createLogger } from '../utils/logger';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();
const logger = createLogger('users-routes');

router.get('/', requireAuth, requireRole('Super Admin', 'Admin'), async (req: Request, res: Response) => {
  try {
    const prisma = getPrismaClient();
    const users = await prisma.user.findMany({
      where: { is_active: true },
      select: {
        id: true,
        username: true,
        full_name: true,
        email: true,
        phone: true,
        is_active: true,
        must_change_password: true,
        last_login: true,
        created_at: true,
        role: true
      },
      orderBy: { created_at: 'desc' }
    });

    res.json({ success: true, data: users });
  } catch (error: any) {
    logger.error(`Error fetching users: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.get('/:id', requireAuth, async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const prisma = getPrismaClient();
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        full_name: true,
        email: true,
        phone: true,
        is_active: true,
        must_change_password: true,
        role: true
      }
    });
    
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    res.json({ success: true, data: user });
  } catch (error: any) {
    logger.error(`Error fetching user: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/', requireAuth, requireRole('Super Admin', 'Admin'), async (req: Request, res: Response) => {
  try {
    const { username, password, full_name, email, phone, role_id } = req.body;
    const prisma = getPrismaClient();
    
    const existing = await prisma.user.findFirst({ where: { username } });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Username already taken' });
    }

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        username,
        password_hash,
        full_name,
        email,
        phone,
        role_id,
        is_active: true,
        must_change_password: true
      },
      select: { id: true, username: true, full_name: true, role_id: true }
    });

    const actionUserId = (req as any).user.id;
    await prisma.auditLog.create({
      data: {
        user_id: actionUserId,
        action: 'create',
        entity_type: 'user',
        entity_id: user.id,
        description: `Created user ${user.username}`
      }
    });

    res.status(201).json({ success: true, data: user, message: 'User created successfully' });
  } catch (error: any) {
    logger.error(`Error creating user: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.put('/:id', requireAuth, requireRole('Super Admin', 'Admin'), async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { full_name, email, phone, role_id, is_active } = req.body;
    const prisma = getPrismaClient();

    const user = await prisma.user.update({
      where: { id },
      data: { full_name, email, phone, role_id, is_active },
      select: { id: true, username: true, full_name: true }
    });

    const actionUserId = (req as any).user.id;
    await prisma.auditLog.create({
      data: {
        user_id: actionUserId,
        action: 'update',
        entity_type: 'user',
        entity_id: user.id,
        description: `Updated user ${user.username}`
      }
    });

    res.json({ success: true, data: user, message: 'User updated successfully' });
  } catch (error: any) {
    logger.error(`Error updating user: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.delete('/:id', requireAuth, requireRole('Super Admin'), async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const prisma = getPrismaClient();
    
    // Soft delete
    await prisma.user.update({
      where: { id },
      data: { is_active: false }
    });

    const actionUserId = (req as any).user.id;
    await prisma.auditLog.create({
      data: {
        user_id: actionUserId,
        action: 'delete',
        entity_type: 'user',
        entity_id: id,
        description: `Deactivated user ID ${id}`
      }
    });

    res.json({ success: true, message: 'User deactivated successfully' });
  } catch (error: any) {
    logger.error(`Error deleting user: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.patch('/:id/reset-password', requireAuth, requireRole('Super Admin', 'Admin'), async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const { newPassword } = req.body;
    
    if (!newPassword) {
      return res.status(400).json({ success: false, message: 'newPassword is required' });
    }

    const prisma = getPrismaClient();
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id },
      data: { password_hash, must_change_password: true }
    });

    const actionUserId = (req as any).user.id;
    await prisma.auditLog.create({
      data: {
        user_id: actionUserId,
        action: 'update',
        entity_type: 'user',
        entity_id: id,
        description: `Reset password for user ID ${id}`
      }
    });

    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error: any) {
    logger.error(`Error resetting password: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
