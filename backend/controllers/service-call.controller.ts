import { Request, Response } from 'express';
import { z } from 'zod';
import { ServiceCallService } from '../services/service-call.service';
import { createLogger } from '../utils/logger';
import { getPrismaClient } from '../utils/database';

const logger = createLogger('service-call-controller');

const serviceCallSchema = z.object({
  customer_id: z.number(),
  engineer_id: z.number().optional().nullable(),
  date: z.string(),
  time: z.string(),
  complaint_description: z.string().min(1, 'Complaint description is required'),
  device_type: z.string().optional(),
  brand: z.string().optional(),
  model_name: z.string().optional(),
  serial_number: z.string().optional(),
  warranty_status: z.string().optional(),
  invoice_number: z.string().optional(),
  call_source: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
  status: z.enum(['open', 'assigned', 'engineer_on_way', 'in_progress', 'waiting_customer', 'waiting_parts', 'completed', 'cancelled', 'closed']).default('open'),
  material_location: z.string().optional(),
  work_performed: z.string().optional(),
  remarks: z.string().optional(),
  follow_up_date: z.string().optional().nullable()
});

export const getServiceCalls = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = req.query.search as string;
    const status = req.query.status as string;
    const priority = req.query.priority as string;
    const engineerId = req.query.engineer_id ? parseInt(req.query.engineer_id as string) : undefined;
    const customerId = req.query.customer_id ? parseInt(req.query.customer_id as string) : undefined;

    const data = await ServiceCallService.getAllServiceCalls(page, limit, search, status, priority, engineerId, customerId);
    res.json({ success: true, data });
  } catch (error: any) {
    logger.error(`Error in getServiceCalls: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getServiceCall = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const serviceCall = await ServiceCallService.getServiceCallById(id);
    
    if (!serviceCall) {
      res.status(404).json({ success: false, message: 'Service call not found' });
      return;
    }
    
    res.json({ success: true, data: serviceCall });
  } catch (error: any) {
    logger.error(`Error in getServiceCall: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const createServiceCall = async (req: Request, res: Response): Promise<void> => {
  try {
    const validation = serviceCallSchema.safeParse(req.body);
    if (!validation.success) {
      res.status(400).json({ success: false, message: 'Validation error', error: validation.error.errors });
      return;
    }

    const userId = (req as any).user.id;
    const serviceCall = await ServiceCallService.createServiceCall(validation.data, userId);

    const prisma = getPrismaClient();
    await prisma.auditLog.create({
      data: {
        user_id: userId,
        action: 'create',
        entity_type: 'service_call',
        entity_id: serviceCall.id,
        description: `Created service call ${serviceCall.call_number}`
      }
    });

    res.status(201).json({ success: true, data: serviceCall, message: 'Service call created successfully' });
  } catch (error: any) {
    logger.error(`Error in createServiceCall: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateServiceCall = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    const validation = serviceCallSchema.safeParse(req.body);
    
    if (!validation.success) {
      res.status(400).json({ success: false, message: 'Validation error', error: validation.error.errors });
      return;
    }

    const userId = (req as any).user.id;
    const serviceCall = await ServiceCallService.updateServiceCall(id, validation.data, userId);
    
    const prisma = getPrismaClient();
    await prisma.auditLog.create({
      data: {
        user_id: userId,
        action: 'update',
        entity_type: 'service_call',
        entity_id: id,
        description: `Updated service call ${serviceCall.call_number}`
      }
    });

    res.json({ success: true, data: serviceCall, message: 'Service call updated successfully' });
  } catch (error: any) {
    logger.error(`Error in updateServiceCall: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const deleteServiceCall = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = parseInt(req.params.id);
    await ServiceCallService.deleteServiceCall(id);
    
    const userId = (req as any).user.id;
    const prisma = getPrismaClient();
    await prisma.auditLog.create({
      data: {
        user_id: userId,
        action: 'delete',
        entity_type: 'service_call',
        entity_id: id,
        description: `Cancelled service call ID ${id}`
      }
    });

    res.json({ success: true, message: 'Service call cancelled successfully' });
  } catch (error: any) {
    logger.error(`Error in deleteServiceCall: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const getServiceCallStats = async (req: Request, res: Response): Promise<void> => {
  try {
    const stats = await ServiceCallService.getServiceCallStats();
    res.json({ success: true, data: stats });
  } catch (error: any) {
    logger.error(`Error in getServiceCallStats: ${error.message}`);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
