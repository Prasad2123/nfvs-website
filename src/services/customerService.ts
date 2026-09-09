import { api } from '../utils/api';

export interface Customer {
  id: string;
  customerCode: string;
  name: string;
  companyName?: string;
  phone: string;
  altPhone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  gstNumber?: string;
  notes?: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  serviceHistory?: ServiceCall[];
}

export interface ServiceCall {
  id: string;
  callNumber: string;
  date: string;
  issue: string;
  status: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export const customerService = {
  fetchCustomers: async (page = 1, limit = 10, search = ''): Promise<PaginatedResponse<Customer>> => {
    let url = `/api/customers?page=${page}&limit=${limit}`;
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }
    const res = await api.get<PaginatedResponse<Customer>>(url);
    if (!res.success || !res.data) throw new Error(res.error || 'Failed to fetch customers');
    return res.data;
  },

  fetchCustomer: async (id: string) => {
    const response = await api.get<Customer>(`/api/customers/${id}`);
    if (!response.success || !response.data) throw new Error(response.error || 'Failed to fetch customer');
    return response.data;
  },

  createCustomer: async (data: Partial<Customer>) => {
    const response = await api.post<Customer>('/api/customers', data);
    if (!response.success || !response.data) throw new Error(response.error || 'Failed to create customer');
    return response.data;
  },

  updateCustomer: async (id: string, data: Partial<Customer>) => {
    const response = await api.put<Customer>(`/api/customers/${id}`, data);
    if (!response.success || !response.data) throw new Error(response.error || 'Failed to update customer');
    return response.data;
  },

  deleteCustomer: async (id: string) => {
    const response = await api.delete(`/api/customers/${id}`);
    if (!response.success) throw new Error(response.error || 'Failed to delete customer');
    return true;
  }
};
