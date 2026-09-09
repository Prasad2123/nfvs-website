import { api } from '../utils/api';

export interface ServiceCall {
  id: number;
  call_number: string;
  date: string;
  time: string;
  customer_id: number;
  engineer_id?: number;
  complaint_description: string;
  device_type?: string;
  brand?: string;
  model_name?: string;
  serial_number?: string;
  warranty_status?: string;
  invoice_number?: string;
  call_source?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'open' | 'assigned' | 'engineer_on_way' | 'in_progress' | 'waiting_customer' | 'waiting_parts' | 'completed' | 'cancelled' | 'closed';
  material_location?: string;
  work_performed?: string;
  remarks?: string;
  follow_up_date?: string;
  completion_date?: string;
  created_at: string;
  customer?: { name: string, contact_person?: string, mobile?: string };
  engineer?: { name: string };
  creator?: { full_name: string };
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const serviceCallService = {
  fetchServiceCalls: async (page = 1, limit = 10, search = '', status = '', priority = '') => {
    const res = await api.get<PaginatedResponse<ServiceCall>>(`/api/service-calls?page=${page}&limit=${limit}&search=${search}&status=${status}&priority=${priority}`);
    if (!res.success) throw new Error(res.error || 'Failed to fetch service calls');
    return res.data;
  },
  fetchServiceCall: async (id: number) => {
    const res = await api.get<ServiceCall>(`/api/service-calls/${id}`);
    if (!res.success) throw new Error(res.error || 'Failed to fetch service call');
    return res.data;
  },
  createServiceCall: async (data: Partial<ServiceCall>) => {
    const res = await api.post<ServiceCall>('/api/service-calls', data);
    if (!res.success) throw new Error(res.error || 'Failed to create service call');
    return res.data;
  },
  updateServiceCall: async (id: number, data: Partial<ServiceCall>) => {
    const res = await api.put<ServiceCall>(`/api/service-calls/${id}`, data);
    if (!res.success) throw new Error(res.error || 'Failed to update service call');
    return res.data;
  },
  deleteServiceCall: async (id: number) => {
    const res = await api.delete(`/api/service-calls/${id}`);
    if (!res.success) throw new Error(res.error || 'Failed to delete service call');
    return res.data;
  }
};
