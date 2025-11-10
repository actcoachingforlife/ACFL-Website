import express from 'express';
import { newsletterController } from '../controllers/newsletterController';
import { authenticate, authorize } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/subscribe', newsletterController.subscribe);
router.post('/unsubscribe', newsletterController.unsubscribe);

// Admin-only routes
router.get('/subscribers', authenticate, authorize('admin'), newsletterController.getSubscribers);

export default router;
