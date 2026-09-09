import { Router } from 'express';
import * as authController from '../controllers/auth.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.post('/login', authController.login);
router.post('/logout', requireAuth, authController.logout);
router.get('/me', requireAuth, authController.me);
router.post('/change-password', requireAuth, authController.changePassword);

router.get('/users', requireAuth, requireRole('Super Admin', 'Admin'), authController.getUsers);
router.post('/users', requireAuth, requireRole('Super Admin', 'Admin'), authController.createUser);
router.put('/users/:id', requireAuth, requireRole('Super Admin', 'Admin'), authController.updateUser);
router.patch('/users/:id/toggle-status', requireAuth, requireRole('Super Admin'), authController.toggleUserStatus);

export default router;
