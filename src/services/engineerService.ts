import { api } from '../utils/api';

export interface Engineer {
  id: number;
  engineer_code: string;
  name: string;
  mobile: string;
  email?: string;
  address?: string;
  department?: string;
  skills?: string; // JSON string
  status: 'available' | 'busy' | 'on_leave';
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const engineerService = {
  fetchEngineers: async (page=1, limit=10, search='', status='') => {
    const res = await api.get<PaginatedResponse<Engineer>>(`/api/engineers?page=${page}&limit=${limit}&search=${search}&status=${status}`);
    if (!res.success) throw new Error(res.error || 'Failed to fetch engineers');
    return res.data;
  },
  fetchEngineer: async (id: number) => {
    const res = await api.get<Engineer>(`/api/engineers/${id}`);
    if (!res.success) throw new Error(res.error || 'Failed to fetch engineer');
    return res.data;
  },
  createEngineer: async (data: Partial<Engineer>) => {
    const res = await api.post<Engineer>('/api/engineers', data);
    if (!res.success) throw new Error(res.error || 'Failed to create engineer');
    return res.data;
  },
  updateEngineer: async (id: number, data: Partial<Engineer>) => {
    const res = await api.put<Engineer>(`/api/engineers/${id}`, data);
    if (!res.success) throw new Error(res.error || 'Failed to update engineer');
    return res.data;
  },
  deleteEngineer: async (id: number) => {
    const res = await api.delete(`/api/engineers/${id}`);
    if (!res.success) throw new Error(res.error || 'Failed to delete engineer');
    return res.data;
  },
  fetchAvailable: async () => {
    const res = await api.get<Engineer[]>('/api/engineers/available');
    if (!res.success) throw new Error(res.error || 'Failed to fetch available engineers');
    return res.data;
  },
};
