import { getPrismaClient } from '../utils/database';

export class EngineerService {
  static async getAllEngineers(page: number, limit: number, search?: string, status?: string) {
    const prisma = getPrismaClient();
    const skip = (page - 1) * limit;

    const where: any = {
      is_active: true
    };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { engineer_code: { contains: search } },
        { mobile: { contains: search } },
        { email: { contains: search } }
      ];
    }

    const [engineers, total] = await Promise.all([
      prisma.engineer.findMany({
        where,
        skip,
        take: limit,
        include: {
          user: {
            select: { id: true, username: true, full_name: true, email: true }
          }
        },
        orderBy: { created_at: 'desc' }
      }),
      prisma.engineer.count({ where })
    ]);

    return {
      engineers,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getEngineerById(id: number) {
    const prisma = getPrismaClient();
    return prisma.engineer.findUnique({
      where: { id },
      include: {
        user: {
          select: { id: true, username: true, full_name: true, email: true }
        },
        service_calls: {
          take: 5,
          orderBy: { date: 'desc' }
        }
      }
    });
  }

  static async createEngineer(data: any, userId: number) {
    const prisma = getPrismaClient();
    
    // Auto-generate engineer_code
    const count = await prisma.engineer.count();
    const engineer_code = `ENG-${String(count + 1).padStart(4, '0')}`;

    return prisma.engineer.create({
      data: {
        ...data,
        engineer_code,
        is_active: true
      }
    });
  }

  static async updateEngineer(id: number, data: any) {
    const prisma = getPrismaClient();
    return prisma.engineer.update({
      where: { id },
      data
    });
  }

  static async deleteEngineer(id: number) {
    const prisma = getPrismaClient();
    
    // Check for active service calls
    const activeCalls = await prisma.serviceCall.count({
      where: {
        engineer_id: id,
        status: { notIn: ['completed', 'cancelled', 'closed'] }
      }
    });

    if (activeCalls > 0) {
      throw new Error('Cannot delete engineer with active service calls.');
    }

    return prisma.engineer.update({
      where: { id },
      data: { is_active: false }
    });
  }

  static async getAvailableEngineers() {
    const prisma = getPrismaClient();
    return prisma.engineer.findMany({
      where: {
        is_active: true,
        status: 'available'
      },
      include: {
        user: {
          select: { id: true, username: true, full_name: true }
        }
      }
    });
  }
}
