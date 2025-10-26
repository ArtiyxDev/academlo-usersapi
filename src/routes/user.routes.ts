import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/user.controller';
import {
  validateUserCreation,
  validateUserUpdate,
} from '../middleware/validation.middleware';

const router: Router = Router();

/**
 * User routes
 */

// GET all users
router.get('/', getAllUsers);

// GET user by ID
router.get('/:id', getUserById);

// POST create new user
router.post('/', validateUserCreation, createUser);

// PUT update user by ID
router.put('/:id', validateUserUpdate, updateUser);

// DELETE user by ID
router.delete('/:id', deleteUser);

export default router;
