import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Permissions, AuthState } from '../types';
import { api } from '../utils/api';

interface AuthStoreState extends AuthState {
  isLoading: boolean;
  login: (credentials: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  changePassword: (newPassword: string) => Promise<{ success: boolean; error?: string }>;
  hasPermission: (module: keyof Permissions, action: string) => boolean;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthStoreState>()(
  persist(
    (set, get) => ({
      user: null,
      permissions: null,
      isAuthenticated: false,
      token: undefined,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const res = await api.post<{ user: User; permissions: Permissions; token?: string }>('/api/auth/login', credentials);
          if (res.success && res.data) {
            set({
              user: res.data.user,
              permissions: res.data.permissions,
              isAuthenticated: true,
              token: res.data.token,
              isLoading: false,
            });
            return { success: true };
          }
          set({ isLoading: false });
          return { success: false, error: res.error || 'Login failed' };
        } catch (error: any) {
          set({ isLoading: false });
          return { success: false, error: error.message || 'Login error' };
        }
      },

      logout: async () => {
        try {
          await api.post('/api/auth/logout');
        } catch (e) {
          console.error('Logout failed:', e);
        } finally {
          set({
            user: null,
            permissions: null,
            isAuthenticated: false,
            token: undefined,
          });
        }
      },

      fetchCurrentUser: async () => {
        if (!get().isAuthenticated) return;
        try {
          const res = await api.get<{ user: User; permissions: Permissions }>('/api/auth/me');
          if (res.success && res.data) {
            set({
              user: res.data.user,
              permissions: res.data.permissions,
            });
          } else {
            get().logout();
          }
        } catch (e) {
          get().logout();
        }
      },

      changePassword: async (newPassword: string) => {
        const res = await api.post('/api/auth/change-password', { newPassword });
        if (res.success) {
          const user = get().user;
          if (user) {
            set({ user: { ...user, must_change_password: false } });
          }
          return { success: true };
        }
        return { success: false, error: res.error };
      },

      hasPermission: (module, action) => {
        const perms = get().permissions as any;
        if (!perms || !perms[module]) return false;
        return !!perms[module][action];
      },

      initialize: async () => {
        const state = get();
        if (state.isAuthenticated) {
          await state.fetchCurrentUser();
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        permissions: state.permissions,
        isAuthenticated: state.isAuthenticated,
        token: state.token,
      }),
    }
  )
);
