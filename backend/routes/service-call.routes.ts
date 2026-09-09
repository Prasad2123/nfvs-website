import { Router } from 'express';
import { 
  getServiceCalls, 
  getServiceCall, 
  createServiceCall, 
  updateServiceCall, 
  deleteServiceCall, 
  getServiceCallStats 
} from '../controllers/service-call.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/stats', requireAuth, getServiceCallStats);
router.get('/', requireAuth, getServiceCalls);
router.get('/:id', requireAuth, getServiceCall);
router.post('/', requireAuth, createServiceCall);
router.put('/:id', requireAuth, updateServiceCall);
router.delete('/:id', requireAuth, requireRole('Super Admin', 'Admin'), deleteServiceCall);

export default router;
