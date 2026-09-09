import { Request, Response } from 'express';
import { z } from 'zod';
import * as customerService from '../services/customer.service';
import { createLogger } from '../utils/logger';
import { getPrismaClient } from '../utils/database';

const logger = createLogger('customer.controller');

// Zod schemas for validation
const customerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    company_name: z.string().optional(),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    zip_code: z.string().optional(),
});

const updateCustomerSchema = customerSchema.partial();

/**
 * Get customers with pagination and search
 */
export const getCustomers = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const search = req.query.search as string | undefined;

        const result = await customerService.getAllCustomers(page, limit, search);
        
        res.status(200).json({
            success: true,
            data: result.data,
            meta: result.meta,
            message: 'Customers retrieved successfully'
        });
    } catch (error: any) {
        logger.error(`Error in getCustomers: ${error.message}`, { error });
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to retrieve customers'
        });
    }
};

/**
 * Get a single customer by ID
 */
export const getCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid customer ID' });
            return;
        }

        const customer = await customerService.getCustomerById(id);
        
        res.status(200).json({
            success: true,
            data: customer,
            message: 'Customer retrieved successfully'
        });
    } catch (error: any) {
        logger.error(`Error in getCustomer: ${error.message}`, { error });
        if (error.message.includes('not found')) {
            res.status(404).json({ success: false, message: error.message });
            return;
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to retrieve customer'
        });
    }
};

/**
 * Create a new customer
 */
export const createCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?.id; // Assuming user ID is attached to req by auth middleware
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized: User ID not found' });
            return;
        }

        const validatedData = customerSchema.parse(req.body);
        
        const newCustomer = await customerService.createCustomer(validatedData, userId);
        
        // Audit log
        await getPrismaClient().auditLog.create({
            data: {
                user_id: userId,
                action: 'Create Customer',
                description: `Created customer ${newCustomer.customer_code} (${newCustomer.name})`
            }
        });
        
        res.status(201).json({
            success: true,
            data: newCustomer,
            message: 'Customer created successfully'
        });
    } catch (error: any) {
        logger.error(`Error in createCustomer: ${error.message}`, { error });
        if (error instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                data: error.errors
            });
            return;
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to create customer'
        });
    }
};

/**
 * Update a customer
 */
export const updateCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid customer ID' });
            return;
        }

        const userId = req.user?.id;
        
        const validatedData = updateCustomerSchema.parse(req.body);
        
        const updatedCustomer = await customerService.updateCustomer(id, validatedData);
        
        // Audit log
        if (userId) {
            await getPrismaClient().auditLog.create({
                data: {
                    user_id: userId,
                    action: 'Update Customer',
                    description: `Updated customer ${updatedCustomer.customer_code} (${updatedCustomer.name})`
                }
            });
        }

        res.status(200).json({
            success: true,
            data: updatedCustomer,
            message: 'Customer updated successfully'
        });
    } catch (error: any) {
        logger.error(`Error in updateCustomer: ${error.message}`, { error });
        if (error instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Validation failed',
                data: error.errors
            });
            return;
        }
        if (error.message.includes('not found')) {
            res.status(404).json({ success: false, message: error.message });
            return;
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to update customer'
        });
    }
};

/**
 * Delete a customer
 */
export const deleteCustomer = async (req: Request, res: Response): Promise<void> => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            res.status(400).json({ success: false, message: 'Invalid customer ID' });
            return;
        }

        const userId = req.user?.id;
        
        const deletedCustomer = await customerService.deleteCustomer(id);
        
        // Audit log
        if (userId) {
            await getPrismaClient().auditLog.create({
                data: {
                    user_id: userId,
                    action: 'Delete Customer',
                    description: `Soft deleted customer ${deletedCustomer.customer_code} (${deletedCustomer.name})`
                }
            });
        }

        res.status(200).json({
            success: true,
            message: 'Customer deleted successfully'
        });
    } catch (error: any) {
        logger.error(`Error in deleteCustomer: ${error.message}`, { error });
        if (error.message.includes('not found')) {
            res.status(404).json({ success: false, message: error.message });
            return;
        }
        if (error.message.includes('Cannot delete')) {
            res.status(409).json({ success: false, message: error.message });
            return;
        }
        res.status(500).json({
            success: false,
            message: error.message || 'Failed to delete customer'
        });
    }
};
