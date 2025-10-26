import { Router } from 'express';
import userRoutes from './user.routes';

const router: Router = Router();

/**
 * API Routes
 */
router.use('/users', userRoutes);

/**
 * Health check route
 */
router.get('/health', (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString(),
  });
});

export default router;
