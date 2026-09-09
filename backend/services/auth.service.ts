import { getPrismaClient } from '../utils/database';
import bcrypt from 'bcrypt';

export const loginUser = async (username: string, password: string) => {
  const prisma = getPrismaClient();
  
  const user = await prisma.user.findUnique({
    where: { username },
    include: { role: true }
  });

  if (!user || !user.is_active) {
    return null;
  }

  const isValidPassword = await bcrypt.compare(password, user.password_hash);
  
  if (!isValidPassword) {
    return null;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: { last_login: new Date() }
  });

  await prisma.auditLog.create({
    data: {
      user_id: user.id,
      action: 'LOGIN',
      entity_type: 'auth',
      description: 'User logged in successfully'
    }
  });

  const { password_hash, ...userWithoutPassword } = user;
  
  return {
    user: userWithoutPassword,
    role: user.role.name,
    permissions: JSON.parse(user.role.permissions)
  };
};

export const changePassword = async (userId: number, newPassword: string): Promise<void> => {
  const prisma = getPrismaClient();
  const password_hash = await bcrypt.hash(newPassword, 10);
  
  await prisma.user.update({
    where: { id: userId },
    data: { 
      password_hash,
      must_change_password: false
    }
  });
};

export const getUserById = async (userId: number) => {
  const prisma = getPrismaClient();
  return prisma.user.findUnique({
    where: { id: userId },
    include: { role: true }
  });
};

export const getAllUsers = async () => {
  const prisma = getPrismaClient();
  return prisma.user.findMany({
    include: { role: true },
    orderBy: { id: 'desc' }
  });
};

export const createUser = async (data: any) => {
  const prisma = getPrismaClient();
  const password_hash = await bcrypt.hash(data.password, 10);
  
  const { password, ...userData } = data;
  
  return prisma.user.create({
    data: {
      ...userData,
      password_hash,
      must_change_password: true
    }
  });
};

export const updateUser = async (id: number, data: any) => {
  const prisma = getPrismaClient();
  
  if (data.password) {
    data.password_hash = await bcrypt.hash(data.password, 10);
    delete data.password;
  }
  
  return prisma.user.update({
    where: { id },
    data
  });
};

export const toggleUserStatus = async (id: number) => {
  const prisma = getPrismaClient();
  
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) throw new Error('User not found');
  
  return prisma.user.update({
    where: { id },
    data: { is_active: !user.is_active }
  });
};
