import { Request, Response } from 'express';
import { User } from '../models';

/**
 * Get all users
 * @route GET /api/v1/users
 */
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['id', 'ASC']],
    });

    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
      count: users.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving users',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Get user by ID
 * @route GET /api/v1/users/:id
 */
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: { exclude: ['password'] },
    });

    if (!user) {
      res.status(404).json({
        success: false,
        message: `User with id ${id} not found`,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: 'User retrieved successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Create a new user
 * @route POST /api/v1/users
 */
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { firstName, lastName, email, password, birthday } = req.body;

    // Check if user with email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: 'User with this email already exists',
      });
      return;
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
      birthday,
    });

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Update user by ID
 * @route PUT /api/v1/users/:id
 */
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email, password, birthday } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: `User with id ${id} not found`,
      });
      return;
    }

    // Check if email is being changed and if it already exists
    if (email && email !== user.email) {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({
          success: false,
          message: 'User with this email already exists',
        });
        return;
      }
    }

    await user.update({
      firstName: firstName || user.firstName,
      lastName: lastName || user.lastName,
      email: email || user.email,
      password: password || user.password,
      birthday: birthday || user.birthday,
    });

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

/**
 * Delete user by ID
 * @route DELETE /api/v1/users/:id
 */
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      res.status(404).json({
        success: false,
        message: `User with id ${id} not found`,
      });
      return;
    }

    await user.destroy();

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: { id },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting user',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
