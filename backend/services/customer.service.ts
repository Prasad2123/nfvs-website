import { getPrismaClient } from '../utils/database';
import { Prisma } from '@prisma/client';

/**
 * Get paginated customers with optional search
 * @param page Page number
 * @param limit Items per page
 * @param search Search term for name, company, phone, or code
 */
export const getAllCustomers = async (page: number, limit: number, search?: string) => {
    const prisma = getPrismaClient();
    const skip = (page - 1) * limit;

    const whereCondition: Prisma.CustomerWhereInput = {
        is_active: true,
    };

    if (search) {
        whereCondition.OR = [
            { name: { contains: search } },
            { company_name: { contains: search } },
            { phone: { contains: search } },
            { customer_code: { contains: search } },
        ];
    }

    const [customers, totalCount] = await Promise.all([
        prisma.customer.findMany({
            where: whereCondition,
            skip,
            take: limit,
            orderBy: { id: 'desc' },
            include: {
                creator: {
                    select: {
                        id: true,
                        full_name: true,
                    }
                }
            }
        }),
        prisma.customer.count({ where: whereCondition })
    ]);

    return {
        data: customers,
        meta: {
            total: totalCount,
            page,
            limit,
            totalPages: Math.ceil(totalCount / limit)
        }
    };
};

/**
 * Get a customer by ID with their recent service calls
 * @param id Customer ID
 */
export const getCustomerById = async (id: number) => {
    const prisma = getPrismaClient();
    const customer = await prisma.customer.findUnique({
        where: { id, is_active: true },
        include: {
            creator: {
                select: {
                    id: true,
                    full_name: true
                }
            },
            service_calls: {
                take: 5,
                orderBy: { created_at: 'desc' },
                include: {
                    engineer: {
                        select: { name: true }
                    }
                }
            }
        }
    });

    if (!customer) {
        throw new Error(`Customer with ID ${id} not found`);
    }

    return customer;
};

/**
 * Create a new customer
 * @param data Customer data
 * @param userId User ID creating the customer
 */
export const createCustomer = async (data: any, userId: number) => {
    const prisma = getPrismaClient();
    
    // Generate customer code (e.g. CUST-TIMESTAMP)
    const customerCode = `CUST-${Date.now()}`;

    const newCustomer = await prisma.customer.create({
        data: {
            ...data,
            customer_code: customerCode,
            created_by: userId,
            is_active: true
        }
    });

    return newCustomer;
};

/**
 * Update an existing customer
 * @param id Customer ID
 * @param data Updated customer data
 */
export const updateCustomer = async (id: number, data: any) => {
    const prisma = getPrismaClient();
    
    // Check if customer exists
    await getCustomerById(id);

    const updatedCustomer = await prisma.customer.update({
        where: { id },
        data
    });

    return updatedCustomer;
};

/**
 * Soft delete a customer
 * @param id Customer ID
 */
export const deleteCustomer = async (id: number) => {
    const prisma = getPrismaClient();
    
    // Check if customer exists
    const customer = await getCustomerById(id);

    // Check if they have active service calls to prevent issues
    // Assuming 'Completed' and 'Cancelled' are the terminal states
    const activeCalls = await prisma.serviceCall.count({
        where: {
            customer_id: id,
            status: { notIn: ['Completed', 'Cancelled'] }
        }
    });

    if (activeCalls > 0) {
        throw new Error(`Cannot delete customer. There are ${activeCalls} active service calls associated with them.`);
    }

    const deletedCustomer = await prisma.customer.update({
        where: { id },
        data: { is_active: false }
    });

    return deletedCustomer;
};
