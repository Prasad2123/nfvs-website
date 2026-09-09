import { Router } from 'express';
import {
    getCustomers,
    getCustomer,
    createCustomer,
    updateCustomer,
    deleteCustomer
} from '../controllers/customer.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

/**
 * @route   GET /api/customers
 * @desc    Get paginated customers with optional search
 * @access  Private (Super Admin, Admin, Receptionist, Service Manager)
 */
router.get(
    '/',
    requireAuth,
    requireRole('Super Admin', 'Admin', 'Receptionist', 'Service Manager'),
    getCustomers
);

/**
 * @route   GET /api/customers/:id
 * @desc    Get a specific customer by ID
 * @access  Private
 */
router.get(
    '/:id',
    requireAuth,
    getCustomer
);

/**
 * @route   POST /api/customers
 * @desc    Create a new customer
 * @access  Private
 */
router.post(
    '/',
    requireAuth,
    createCustomer
);

/**
 * @route   PUT /api/customers/:id
 * @desc    Update a customer
 * @access  Private
 */
router.put(
    '/:id',
    requireAuth,
    updateCustomer
);

/**
 * @route   DELETE /api/customers/:id
 * @desc    Soft delete a customer
 * @access  Private
 */
router.delete(
    '/:id',
    requireAuth,
    deleteCustomer
);

export default router;
