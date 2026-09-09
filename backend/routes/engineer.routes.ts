import { Router } from 'express';
import { 
  getEngineers, 
  getEngineer, 
  createEngineer, 
  updateEngineer, 
  deleteEngineer, 
  getAvailableEngineers 
} from '../controllers/engineer.controller';
import { requireAuth, requireRole } from '../middleware/auth.middleware';

const router = Router();

router.get('/', requireAuth, getEngineers);
router.get('/available', requireAuth, getAvailableEngineers);
router.get('/:id', requireAuth, getEngineer);
router.post('/', requireAuth, requireRole('Super Admin', 'Admin'), createEngineer);
router.put('/:id', requireAuth, requireRole('Super Admin', 'Admin', 'Service Manager'), updateEngineer);
router.delete('/:id', requireAuth, requireRole('Super Admin', 'Admin'), deleteEngineer);

export default router;
