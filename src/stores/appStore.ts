import { create } from 'zustand';
import { AppNotification } from '../types';
import { api } from '../utils/api';

interface AppState {
  notifications: AppNotification[];
  unreadCount: number;
  sidebarCollapsed: boolean;
  theme: 'light' | 'dark';
  isLoading: boolean;
  currentPage: string;
  
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: number) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  toggleSidebar: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
  setCurrentPage: (page: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  sidebarCollapsed: false,
  theme: 'light',
  isLoading: false,
  currentPage: 'Dashboard',

  fetchNotifications: async () => {
    try {
      const res = await api.get<AppNotification[]>('/api/notifications');
      if (res.success && res.data) {
        const unreadCount = res.data.filter(n => !n.is_read).length;
        set({ notifications: res.data, unreadCount });
      }
    } catch (e) {
      console.error('Failed to fetch notifications:', e);
    }
  },

  markAsRead: async (id: number) => {
    try {
      await api.patch(`/api/notifications/${id}/read`);
      const { notifications } = get();
      const updated = notifications.map(n => n.id === id ? { ...n, is_read: true } : n);
      set({ 
        notifications: updated,
        unreadCount: updated.filter(n => !n.is_read).length 
      });
    } catch (e) {
      console.error('Failed to mark notification as read:', e);
    }
  },

  markAllAsRead: async () => {
    try {
      await api.post('/api/notifications/mark-all-read');
      const { notifications } = get();
      const updated = notifications.map(n => ({ ...n, is_read: true }));
      set({ notifications: updated, unreadCount: 0 });
    } catch (e) {
      console.error('Failed to mark all notifications as read:', e);
    }
  },

  toggleSidebar: () => {
    set(state => ({ sidebarCollapsed: !state.sidebarCollapsed }));
  },

  setTheme: (theme) => {
    set({ theme });
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  setCurrentPage: (page) => {
    set({ currentPage: page });
  }
}));
