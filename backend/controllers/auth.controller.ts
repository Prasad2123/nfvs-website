import { Request, Response } from 'express';
import * as authService from '../services/auth.service';
import { createLogger } from '../utils/logger';
import { z } from 'zod';
import { getPrismaClient } from '../utils/database';

const logger = createLogger('AuthController');

const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1)
});

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = loginSchema.parse(req.body);
    
    const result = await authService.loginUser(username, password);
    
    if (!result) {
      return res.status(401).json({ success: false, message: 'Invalid credentials or inactive account' });
    }

    req.session.userId = result.user.id;
    req.session.userRole = result.role;
    req.session.userName = result.user.username;
    req.session.userFullName = result.user.full_name;
    req.session.permissions = result.permissions;

    logger.info(`User ${username} logged in successfully`);

    res.json({ success: true, data: result });
  } catch (error: any) {
    logger.error(`Login error: ${error.message}`);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req: Request, res: Response) => {
  const userId = req.session.userId;
  
  if (userId) {
    const prisma = getPrismaClient();
    await prisma.auditLog.create({
      data: {
        user_id: userId,
        action: 'LOGOUT',
        entity_type: 'auth',
        description: 'User logged out'
      }
    });
  }

  req.session.destroy((err) => {
    if (err) {
      logger.error(`Logout error: ${err.message}`);
      return res.status(500).json({ success: false, message: 'Failed to logout' });
    }
    res.json({ success: true, message: 'Logged out successfully' });
  });
};

export const me = async (req: Request, res: Response) => {
  try {
    const user = await authService.getUserById(req.user!.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const { password_hash, ...userWithoutPassword } = user;
    res.json({ success: true, data: userWithoutPassword });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const changePasswordSchema = z.object({
  newPassword: z.string().min(6)
});

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { newPassword } = changePasswordSchema.parse(req.body);
    await authService.changePassword(req.user!.id, newPassword);
    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await authService.getAllUsers();
    res.json({ success: true, data: users });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const createUserSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(6),
  full_name: z.string().min(1),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  role_id: z.number().int().positive()
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const data = createUserSchema.parse(req.body);
    const user = await authService.createUser(data);
    res.status(201).json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const updateUserSchema = z.object({
  username: z.string().min(3).optional(),
  password: z.string().min(6).optional(),
  full_name: z.string().min(1).optional(),
  email: z.string().email().optional().nullable(),
  phone: z.string().optional().nullable(),
  role_id: z.number().int().positive().optional()
});

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const data = updateUserSchema.parse(req.body);
    const user = await authService.updateUser(id, data);
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const toggleUserStatus = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await authService.toggleUserStatus(id);
    res.json({ success: true, data: user });
  } catch (error: any) {
    res.status(400).json({ success: false, message: error.message });
  }
};
