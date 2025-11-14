import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

/**
 * Rate limiter configuration for various endpoints
 * Helps prevent brute force attacks and DDoS attempts
 */

// Custom key generator that uses IP address
const generateKey = (req: Request): string => {
  return req.ip || req.connection.remoteAddress || 'unknown';
};

// Custom handler for rate limit exceeded
const rateLimitHandler = (req: Request, res: Response) => {
  res.status(429).json({
    error: 'Too many requests',
    message: 'You have exceeded the maximum number of requests. Please try again later.',
    retryAfter: res.getHeader('Retry-After'),
  });
};

/**
 * Strict rate limiter for authentication endpoints
 * - 5 requests per 15 minutes per IP
 * - Prevents brute force attacks on login/register
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  message: 'Too many authentication attempts. Please try again after 15 minutes.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  keyGenerator: generateKey,
  handler: rateLimitHandler,
  skipSuccessfulRequests: false, // Count all requests
  skipFailedRequests: false,
});

/**
 * Moderate rate limiter for password reset/forgot password
 * - 3 requests per hour per IP
 * - Prevents abuse of password reset functionality
 */
export const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 requests per hour
  message: 'Too many password reset attempts. Please try again after an hour.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  handler: rateLimitHandler,
});

/**
 * General API rate limiter
 * - 300 requests per 15 minutes per IP (increased for authenticated users)
 * - Applies to most API endpoints
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limit each IP to 300 requests per windowMs
  message: 'Too many requests from this IP. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  handler: rateLimitHandler,
});

/**
 * Strict rate limiter for payment endpoints
 * - 10 requests per 15 minutes per IP
 * - Prevents abuse of payment processing
 */
export const paymentLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 payment requests per windowMs
  message: 'Too many payment requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  handler: rateLimitHandler,
});

/**
 * Moderate rate limiter for booking endpoints
 * - 20 requests per 15 minutes per IP
 */
export const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20,
  message: 'Too many booking requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  handler: rateLimitHandler,
});

/**
 * Lenient rate limiter for file uploads
 * - 30 requests per 15 minutes per IP
 */
export const uploadLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30,
  message: 'Too many upload requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  handler: rateLimitHandler,
});

/**
 * Lenient rate limiter for admin endpoints
 * - 200 requests per 15 minutes per IP (authenticated users need higher limits)
 * Admin users make multiple requests when loading dashboards
 */
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: 'Too many admin requests. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  handler: rateLimitHandler,
});

/**
 * Contact form rate limiter
 * - 5 requests per hour per IP
 * - Prevents spam through contact forms
 */
export const contactFormLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5,
  message: 'Too many contact form submissions. Please try again after an hour.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  handler: rateLimitHandler,
});

/**
 * Newsletter subscription rate limiter
 * - 3 requests per hour per IP
 */
export const newsletterLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  message: 'Too many newsletter subscription attempts. Please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: generateKey,
  handler: rateLimitHandler,
});
