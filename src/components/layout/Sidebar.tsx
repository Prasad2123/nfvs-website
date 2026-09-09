import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Wrench,
  PhoneCall,
  Calendar,
  BarChart,
  Settings,
  Database,
  UserCog,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface NavItem {
  name: string;
  icon: any;
  path: string;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Customers', icon: Users, path: '/customers' },
  { name: 'Engineers', icon: Wrench, path: '/engineers' },
  { name: 'Service Calls', icon: PhoneCall, path: '/service-calls' },
  { name: 'Calendar', icon: Calendar, path: '/calendar' },
  { name: 'Reports', icon: BarChart, path: '/reports' }
];

const adminNavItems: NavItem[] = [
  { name: 'Users', icon: UserCog, path: '/users' },
  { name: 'Settings', icon: Settings, path: '/settings' },
  { name: 'Backup', icon: Database, path: '/backup' }
];

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  const roleName = typeof user?.role === 'object' ? (user?.role as any)?.name as string : user?.role as string | undefined;
  const isAdmin = roleName === 'Super Admin' || roleName === 'Admin';

  const NavItemComponent = ({ item }: { item: NavItem }) => (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-blue-600 ${
          isActive ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'
        }`
      }
    >
      <item.icon className="h-5 w-5" />
      {!collapsed && (
        <span className="flex-1">{item.name}</span>
      )}
    </NavLink>
  );

  return (
    <div className={`flex flex-col h-screen border-r border-gray-200 bg-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        {!collapsed && (
          <span className="text-lg font-bold text-blue-600 truncate">Hardware Service Pro</span>
        )}
        <Button variant="ghost" size="icon" className={collapsed ? 'w-full' : ''}>
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>

      <ScrollArea className="flex-1 py-4">
        <nav className="space-y-1 px-2">
          {mainNavItems.map((item) => (
            <NavItemComponent key={item.path} item={item} />
          ))}

          {isAdmin && (
            <>
              <div className="my-4">
                <Separator />
                {!collapsed && (
                  <h4 className="px-3 mt-4 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Administration
                  </h4>
                )}
              </div>
              {adminNavItems.map((item) => (
                <NavItemComponent key={item.path} item={item} />
              ))}
            </>
          )}
        </nav>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200">
        <div className={`flex items-center gap-3 ${collapsed ? 'justify-center' : ''}`}>
          <Avatar>
            <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
              {getInitials(user?.full_name || user?.username || '')}
            </AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.full_name || user?.username}
              </p>
              <p className="text-xs text-gray-500 truncate">{roleName || ''}</p>
            </div>
          )}
        </div>
        {!collapsed && (
          <Button variant="outline" className="w-full mt-4 flex items-center gap-2" onClick={handleLogout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        )}
      </div>
    </div>
  );
}
