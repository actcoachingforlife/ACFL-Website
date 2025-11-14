import express from 'express';
import { newsletterController } from '../controllers/newsletterController';
import { authenticate, authorize } from '../middleware/auth';
import { newsletterLimiter } from '../middleware/rateLimiter';

const router = express.Router();

// Public routes - with rate limiting
router.post('/subscribe', newsletterLimiter, newsletterController.subscribe);
router.post('/unsubscribe', newsletterLimiter, newsletterController.unsubscribe);

// Admin-only routes
router.get('/subscribers', authenticate, authorize('admin'), newsletterController.getSubscribers);

export default router;
