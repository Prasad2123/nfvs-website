import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-900">
      <Sidebar collapsed={collapsed} />
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
        <TopBar collapsed={collapsed} setCollapsed={setCollapsed} onToggle={() => setCollapsed(!collapsed)} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
