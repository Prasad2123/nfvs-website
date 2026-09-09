import { Request, Response } from 'express';
import { z } from 'zod';
import { EngineerService } from '../services/engineer.service';
import { createLogger } from '../utils/logger';
import { getPrismaClient } from '../utils/database';

const logger = createLogger('engineer-controller');

const engineerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  mobile: z.string().min(10, 'Mobile must be at least 10 characters'),
  email: z.string().email('Invalid email').optional().or(z.literal('')),
  address: z.string().optional(),
  department: z.string().optional(),
  skills: z.string().optional(),
  status: z.enum(['available', 'busy', 'on_leave']).default('available')
});

export const getEngineers = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const status = req.query.status as string;

    const data = await EngineerService.getAllEngineers(page, limit, search, status);
    res.json({ success: true, data });
  } catch (error: any) {
    logger.error(`Error in getEngineers: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getEngineer = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const engineer = await EngineerService.getEngineerById(id);
    
    if (!engineer) {
      res.status(404).json({ success: false, message: 'Engineer not found' });
      return;
    }
    
    res.json({ success: true, data: engineer });
  } catch (error: any) {
    logger.error(`Error in getEngineer: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const createEngineer = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = engineerSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ success: false, message: 'Validation error', error: validation.error.errors });
      return;
    }

    const userId = (req as any).user.id;
    const engineer = await EngineerService.createEngineer(validation.data, userId);

    const prisma = getPrismaClient();
    await prisma.auditLog.create({
      data: {
        user_id: userId,
        action: 'create',
        entity_type: 'engineer',
        entity_id: engineer.id,
        description: `Created engineer ${engineer.engineer_code}`
      }
    });

    res.status(201).json({ success: true, data: engineer, message: 'Engineer created successfully' });
  } catch (error: any) {
    logger.error(`Error in createEngineer: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateEngineer = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const validation = engineerSchema.safeParse(req.body);
    
    if (!validation.success) {
      res.status(400).json({ success: false, message: 'Validation error', error: validation.error.errors });
      return;
    }

    const engineer = await EngineerService.updateEngineer(id, validation.data);
    const userId = (req as any).user.id;
    
    const prisma = getPrismaClient();
    await prisma.auditLog.create({
      data: {
        user_id: userId,
        action: 'update',
        entity_type: 'engineer',
        entity_id: engineer.id,
        description: `Updated engineer ${engineer.engineer_code}`
      }
    });

    res.json({ success: true, data: engineer, message: 'Engineer updated successfully' });
  } catch (error: any) {
    logger.error(`Error in updateEngineer: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteEngineer = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await EngineerService.deleteEngineer(id);
    
    const userId = (req as any).user.id;
    const prisma = getPrismaClient();
    await prisma.auditLog.create({
      data: {
        user_id: userId,
        action: 'delete',
        entity_type: 'engineer',
        entity_id: id,
        description: `Deleted engineer ID ${id}`
      }
    });

    res.json({ success: true, message: 'Engineer deleted successfully' });
  } catch (error: any) {
    logger.error(`Error in deleteEngineer: ${error.message}`);
    if (error.message.includes('active service calls')) {
      res.status(400).json({ success: false, message: error.message });
      return;
    }
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getAvailableEngineers = async (req: Request, res: Response): Promise<void> => {
  try {
    const engineers = await EngineerService.getAvailableEngineers();
    res.json({ success: true, data: engineers });
  } catch (error: any) {
    logger.error(`Error in getAvailableEngineers: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
