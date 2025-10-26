import { Request, Response, NextFunction } from 'express';

/**
 * Validation middleware for user creation
 */
export const validateUserCreation = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { firstName, lastName, email, password, birthday } = req.body;

  // Required fields validation
  if (!firstName || !lastName || !email || !password || !birthday) {
    res.status(400).json({
      success: false,
      message:
        'Missing required fields: firstName, lastName, email, password, and birthday are required',
    });
    return;
  }

  // Email format validation (basic)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({
      success: false,
      message: 'Invalid email format',
    });
    return;
  }

  // Password validation (minimum 8 characters)
  if (password.length < 8) {
    res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long',
    });
    return;
  }

  // Birthday validation (basic date format)
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(birthday)) {
    res.status(400).json({
      success: false,
      message: 'Birthday must be in YYYY-MM-DD format',
    });
    return;
  }

  next();
};

/**
 * Validation middleware for user update
 */
export const validateUserUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { email, password, birthday } = req.body;

  // Email format validation if provided
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      res.status(400).json({
        success: false,
        message: 'Invalid email format',
      });
      return;
    }
  }

  // Password validation if provided
  if (password !== undefined && password.length < 8) {
    res.status(400).json({
      success: false,
      message: 'Password must be at least 8 characters long',
    });
    return;
  }

  // Birthday validation if provided
  if (birthday) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(birthday)) {
      res.status(400).json({
        success: false,
        message: 'Birthday must be in YYYY-MM-DD format',
      });
      return;
    }
  }

  next();
};
