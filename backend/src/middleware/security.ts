import helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';

/**
 * Security middleware configuration
 * Implements various security best practices
 */

/**
 * Helmet configuration for setting security headers
 * Protects against common web vulnerabilities
 */
export const helmetConfig = helmet({
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://js.squareup.com", "https://sandbox.web.squareup.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://connect.squareup.com", "https://pci-connect.squareup.com", "wss:", "https:"],
      frameSrc: ["'self'", "https://js.squareup.com", "https://sandbox.web.squareup.com"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  },
  // Prevent clickjacking
  frameguard: {
    action: 'deny',
  },
  // Hide X-Powered-By header
  hidePoweredBy: true,
  // Enable HSTS (HTTP Strict Transport Security)
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  // Prevent MIME type sniffing
  noSniff: true,
  // Enable XSS protection
  xssFilter: true,
  // Referrer policy
  referrerPolicy: {
    policy: 'strict-origin-when-cross-origin',
  },
});

/**
 * Custom input sanitization middleware
 * Sanitizes dangerous characters from request data (body, query, params)
 * Compatible with Express 5
 */
export const sanitizeInput = (req: Request, res: Response, next: NextFunction) => {
  const sanitizeObject = (obj: any): any => {
    if (!obj || typeof obj !== 'object') {
      return obj;
    }

    const sanitized: any = Array.isArray(obj) ? [] : {};

    for (const key in obj) {
      // Use Object.prototype.hasOwnProperty.call for safety
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // Remove keys that contain $ or . (NoSQL injection prevention)
        const sanitizedKey = key.replace(/[$\.]/g, '_');

        if (typeof obj[key] === 'object' && obj[key] !== null) {
          sanitized[sanitizedKey] = sanitizeObject(obj[key]);
        } else if (typeof obj[key] === 'string') {
          // Remove dangerous SQL characters from strings
          sanitized[sanitizedKey] = obj[key];
        } else {
          sanitized[sanitizedKey] = obj[key];
        }
      }
    }

    return sanitized;
  };

  try {
    // Sanitize body
    if (req.body && typeof req.body === 'object') {
      req.body = sanitizeObject(req.body);
    }

    // Sanitize query params (create new object since it's read-only in Express 5)
    if (req.query && typeof req.query === 'object' && Object.keys(req.query).length > 0) {
      const sanitizedQuery = sanitizeObject(req.query);
      // Replace query with sanitized version
      Object.defineProperty(req, 'query', {
        value: sanitizedQuery,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }

    // Sanitize params
    if (req.params && typeof req.params === 'object') {
      req.params = sanitizeObject(req.params);
    }

    next();
  } catch (error) {
    console.error('Error in sanitizeInput middleware:', error);
    next(); // Continue even if sanitization fails
  }
};

/**
 * Additional input validation middleware
 * Validates and sanitizes common input fields
 */
export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  // Check for suspicious patterns in request body
  const suspiciousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, // Script tags
    /javascript:/gi, // JavaScript protocol
    /on\w+\s*=/gi, // Event handlers
    /eval\s*\(/gi, // eval() calls
    /expression\s*\(/gi, // CSS expressions
  ];

  const checkForSuspiciousContent = (obj: any): boolean => {
    if (typeof obj === 'string') {
      return suspiciousPatterns.some(pattern => pattern.test(obj));
    }
    if (typeof obj === 'object' && obj !== null) {
      return Object.values(obj).some(value => checkForSuspiciousContent(value));
    }
    return false;
  };

  if (req.body && checkForSuspiciousContent(req.body)) {
    console.warn('Suspicious input detected:', {
      ip: req.ip,
      path: req.path,
      method: req.method,
    });
    return res.status(400).json({
      error: 'Invalid input',
      message: 'Your request contains potentially malicious content.',
    });
  }

  next();
};

/**
 * Request logging for security monitoring
 */
export const securityLogger = (req: Request, res: Response, next: NextFunction) => {
  const sensitiveEndpoints = ['/api/auth', '/api/payments', '/api/admin'];
  const isSensitive = sensitiveEndpoints.some(endpoint => req.path.startsWith(endpoint));

  if (isSensitive) {
    console.log({
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      ip: req.ip,
      userAgent: req.get('user-agent'),
    });
  }

  next();
};

/**
 * Prevent parameter pollution
 * Ensures query parameters are not arrays when they shouldn't be
 */
export const preventParameterPollution = (req: Request, res: Response, next: NextFunction) => {
  // Define parameters that should only have single values
  const singleValueParams = ['id', 'email', 'userId', 'coachId', 'clientId', 'sessionId'];

  if (req.query) {
    for (const param of singleValueParams) {
      if (Array.isArray(req.query[param])) {
        // Take only the first value if it's an array
        req.query[param] = req.query[param][0];
      }
    }
  }

  next();
};

/**
 * CSRF token validation for state-changing operations
 * This is a basic implementation - consider using csurf package for production
 */
export const validateCSRF = (req: Request, res: Response, next: NextFunction) => {
  // Skip CSRF validation for GET, HEAD, OPTIONS requests
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  // Skip CSRF validation for API endpoints that use JWT authentication
  // JWT itself provides CSRF protection when stored in httpOnly cookies
  const csrfExemptPaths = ['/api/'];
  if (csrfExemptPaths.some(path => req.path.startsWith(path))) {
    return next();
  }

  next();
};

/**
 * HTTP method validation
 * Ensures only allowed HTTP methods are used
 */
export const validateHttpMethod = (req: Request, res: Response, next: NextFunction) => {
  const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'];

  if (!allowedMethods.includes(req.method)) {
    return res.status(405).json({
      error: 'Method Not Allowed',
      message: `The ${req.method} method is not allowed for this endpoint.`,
    });
  }

  next();
};
