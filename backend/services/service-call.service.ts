import { getPrismaClient } from '../utils/database';

export class ServiceCallService {
  static async getAllServiceCalls(
    page: number, 
    limit: number, 
    search?: string, 
    status?: string, 
    priority?: string, 
    engineerId?: number, 
    customerId?: number
  ) {
    const prisma = getPrismaClient();
    const skip = (page - 1) * limit;

    const where: any = {};
    if (status) where.status = status;
    if (priority) where.priority = priority;
    if (engineerId) where.engineer_id = engineerId;
    if (customerId) where.customer_id = customerId;

    if (search) {
      where.OR = [
        { call_number: { contains: search } },
        { complaint_description: { contains: search } },
        { serial_number: { contains: search } }
      ];
    }

    const [serviceCalls, total] = await Promise.all([
      prisma.serviceCall.findMany({
        where,
        skip,
        take: limit,
        include: {
          customer: { select: { name: true, company_name: true } },
          engineer: { select: { name: true } },
          creator: { select: { full_name: true } }
        },
        orderBy: { created_at: 'desc' }
      }),
      prisma.serviceCall.count({ where })
    ]);

    return {
      serviceCalls,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  static async getServiceCallById(id: number) {
    const prisma = getPrismaClient();
    return prisma.serviceCall.findUnique({
      where: { id },
      include: {
        customer: true,
        engineer: true,
        creator: { select: { id: true, full_name: true } },
        history: {
          include: {
            user: { select: { full_name: true } }
          },
          orderBy: { created_at: 'desc' }
        },
        follow_ups: true,
        attachments: true
      }
    });
  }

  static async createServiceCall(data: any, userId: number) {
    const prisma = getPrismaClient();
    
    // Auto-generate call_number
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0].replace(/-/g, '');
    const count = await prisma.serviceCall.count({
      where: { call_number: { startsWith: `SC-${dateStr}-` } }
    });
    const call_number = `SC-${dateStr}-${String(count + 1).padStart(4, '0')}`;

    return prisma.$transaction(async (tx) => {
      const call = await tx.serviceCall.create({
        data: {
          ...data,
          call_number,
          created_by: userId
        }
      });

      await tx.callHistory.create({
        data: {
          call_id: call.id,
          changed_by: userId,
          old_status: null,
          new_status: call.status,
          action: 'created',
          notes: 'Service call created'
        }
      });

      return call;
    });
  }

  static async updateServiceCall(id: number, data: any, userId: number) {
    const prisma = getPrismaClient();

    return prisma.$transaction(async (tx) => {
      const existingCall = await tx.serviceCall.findUnique({ where: { id } });
      if (!existingCall) throw new Error('Service call not found');

      const updatedCall = await tx.serviceCall.update({
        where: { id },
        data: {
          ...data,
          updated_by: userId
        }
      });

      if (existingCall.status !== updatedCall.status) {
        await tx.callHistory.create({
          data: {
            call_id: id,
            changed_by: userId,
            old_status: existingCall.status,
            new_status: updatedCall.status,
            action: 'status_changed',
            notes: `Status changed from ${existingCall.status} to ${updatedCall.status}`
          }
        });
      }

      return updatedCall;
    });
  }

  static async deleteServiceCall(id: number) {
    const prisma = getPrismaClient();
    return prisma.serviceCall.update({
      where: { id },
      data: { status: 'cancelled' }
    });
  }

  static async getServiceCallStats() {
    const prisma = getPrismaClient();
    
    const [statusStats, priorityStats] = await Promise.all([
      prisma.serviceCall.groupBy({
        by: ['status'],
        _count: { id: true }
      }),
      prisma.serviceCall.groupBy({
        by: ['priority'],
        _count: { id: true }
      })
    ]);

    return {
      byStatus: statusStats.reduce((acc, curr) => ({ ...acc, [curr.status]: curr._count.id }), {}),
      byPriority: priorityStats.reduce((acc, curr) => ({ ...acc, [curr.priority]: curr._count.id }), {})
    };
  }
}
