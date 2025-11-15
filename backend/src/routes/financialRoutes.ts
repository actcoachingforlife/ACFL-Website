import { Router } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { requirePermission } from '../middleware/adminAuth';
import { financialController } from '../controllers/financialController';

const router = Router();

// All financial routes require authentication
router.use(authenticate);

// Allow both admin and staff to access financial routes
router.use(authorize('admin', 'staff'));

// Transaction management
router.get('/transactions', financialController.getTransactions);
router.get('/transactions/stats', financialController.getTransactionStats);

// Refund requires specific permission
router.post('/transactions/:id/refund', requirePermission('financial.refund'), financialController.processRefund);

// Reports
router.get('/reports', financialController.getFinancialReports);
router.post('/reports/generate', financialController.generateReport);

// Payouts
router.get('/payouts', financialController.getCoachPayouts);

export default router;