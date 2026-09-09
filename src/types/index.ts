// User & Auth
export interface User {
  id: number;
  username: string;
  full_name: string;
  email?: string;
  phone?: string;
  role_id: number;
  role?: Role;
  is_active: boolean;
  must_change_password: boolean;
  last_login?: string;
}

export interface Role {
  id: number;
  name: string;
  description: string;
  permissions: Permissions;
}

export interface Permissions {
  dashboard: { view: boolean };
  customers: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  engineers: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  service_calls: { view: boolean; create: boolean; edit: boolean; delete: boolean; assign: boolean };
  reports: { view: boolean; export: boolean };
  users: { view: boolean; create: boolean; edit: boolean; delete: boolean };
  settings: { view: boolean; edit: boolean };
  backup: { view: boolean; create: boolean; restore: boolean };
}

export interface AuthState {
  user: User | null;
  permissions: Permissions | null;
  isAuthenticated: boolean;
  token?: string;
}

// Customer
export interface Customer {
  id: number;
  customer_code: string;
  name: string;
  company_name?: string;
  phone: string;
  alt_phone?: string;
  email?: string;
  address?: string;
  city?: string;
  state?: string;
  pincode?: string;
  gst_number?: string;
  notes?: string;
  is_active: boolean;
  created_at: string;
}

// Engineer
export interface Engineer {
  id: number;
  engineer_code: string;
  name: string;
  mobile: string;
  email?: string;
  address?: string;
  department?: string;
  skills: string[];
  status: 'available' | 'busy' | 'on_leave';
  is_active: boolean;
  created_at: string;
}

// Service Call
export type CallStatus = 'open' | 'assigned' | 'engineer_on_way' | 'in_progress' | 'waiting_customer' | 'waiting_parts' | 'completed' | 'cancelled' | 'closed';
export type CallPriority = 'low' | 'medium' | 'high' | 'critical';

export interface ServiceCall {
  id: number;
  call_number: string;
  date: string;
  time: string;
  customer_id: number;
  customer?: Customer;
  engineer_id?: number;
  engineer?: Engineer;
  complaint_description: string;
  device_type?: string;
  brand?: string;
  model_name?: string;
  serial_number?: string;
  warranty_status?: string;
  invoice_number?: string;
  call_source?: string;
  priority: CallPriority;
  status: CallStatus;
  work_performed?: string;
  remarks?: string;
  follow_up_date?: string;
  completion_date?: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

// Dashboard
export interface DashboardStats {
  today_calls: number;
  pending_calls: number;
  completed_calls: number;
  cancelled_calls: number;
  total_customers: number;
  engineers_count: number;
  followups_today: number;
  missed_followups: number;
}

export interface MonthlyData {
  month: string;
  total: number;
  completed: number;
  pending: number;
}

// API Response
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}

// Notification
export interface AppNotification {
  id: number;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  is_read: boolean;
  created_at: string;
}
