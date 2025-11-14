import { Router } from 'express';
import {
  registerClient,
  registerCoach,
  login,
  logout,
  getProfile,
  createAdmin,
  forgotPassword,
  resetPassword,
  verifyResetOTP,
  verifyEmail,
  resendVerificationEmail
} from '../controllers/authController';
import {
  validateRegisterClient,
  validateRegisterCoach,
  validateLogin
} from '../middleware/validation';
import { authenticate, requireAdmin } from '../middleware/auth';
import { body } from 'express-validator';
import { authLimiter, passwordResetLimiter } from '../middleware/rateLimiter';

const router = Router();

// Public routes - with strict rate limiting
router.post('/register/client', authLimiter, validateRegisterClient, registerClient);
router.post('/register/coach', authLimiter, validateRegisterCoach, registerCoach);
router.post('/login', authLimiter, validateLogin, login);
router.post('/logout', authenticate, logout); // Protect logout to access user info for logging

// Email verification routes - with rate limiting
router.post('/verify-email', authLimiter, verifyEmail);
router.get('/verify-email', verifyEmail); // Support both GET and POST for email verification
router.post('/resend-verification', authLimiter, [
  body('email').isEmail().normalizeEmail(),
], resendVerificationEmail);

// Password reset routes - with strict rate limiting
router.post('/forgot-password', passwordResetLimiter, [
  body('email').isEmail().normalizeEmail(),
], forgotPassword);
router.post('/verify-reset-otp', passwordResetLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('otp').isLength({ min: 6, max: 6 }).isNumeric(),
], verifyResetOTP);
router.post('/reset-password', passwordResetLimiter, [
  body('email').isEmail().normalizeEmail(),
  body('otp').isLength({ min: 6, max: 6 }).isNumeric(),
  body('newPassword').isLength({ min: 8 }),
], resetPassword);

// Admin routes (protected)
router.post('/create-admin', requireAdmin, createAdmin);

// Protected routes
router.get('/profile', authenticate, getProfile);

export default router;