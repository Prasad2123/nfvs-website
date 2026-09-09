import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage } from './pages/auth/LoginPage';
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ComingSoonPage } from './pages/ComingSoonPage';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { Toaster } from './components/ui/toaster';
import { useAuthStore } from './stores/authStore';

// Customer pages
import CustomerListPage from './pages/customers/CustomerListPage';
import CustomerFormPage from './pages/customers/CustomerFormPage';
import CustomerDetailPage from './pages/customers/CustomerDetailPage';

// Engineer pages
import EngineerListPage from './pages/engineers/EngineerListPage';
import EngineerFormPage from './pages/engineers/EngineerFormPage';
import EngineerDetailPage from './pages/engineers/EngineerDetailPage';

// Service Call pages
import ServiceCallListPage from './pages/service-calls/ServiceCallListPage';

// Settings, Backup, Users, Calendar, Reports
import SettingsPage from './pages/settings/SettingsPage';
import BackupPage from './pages/backup/BackupPage';
import UserListPage from './pages/users/UserListPage';
import UserFormPage from './pages/users/UserFormPage';
import CalendarPage from './pages/CalendarPage';
import ReportsPage from './pages/ReportsPage';

// Lazy load service call form and detail if they exist
let ServiceCallFormPage: React.ComponentType<any> = () => <ComingSoonPage moduleName="Service Call Form" />;
let ServiceCallDetailPage: React.ComponentType<any> = () => <ComingSoonPage moduleName="Service Call Detail" />;

try {
  // Will be replaced once subagent 2 finishes
  const formMod = require('./pages/service-calls/ServiceCallFormPage');
  ServiceCallFormPage = formMod.default || formMod;
  const detailMod = require('./pages/service-calls/ServiceCallDetailPage');
  ServiceCallDetailPage = detailMod.default || detailMod;
} catch { /* not built yet */ }

import { NFVentureStudioPage } from './pages/NFVentureStudioPage';

function App() {
  const initialize = useAuthStore((s) => s.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      <Routes>
        {/* NF Venture Studio Primary Website */}
        <Route path="/" element={<NFVentureStudioPage />} />
        <Route path="/nf-venture-studio" element={<NFVentureStudioPage />} />
        <Route path="/studio" element={<NFVentureStudioPage />} />

        {/* Management & Dashboard System */}
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Customers */}
          <Route path="/customers" element={<CustomerListPage />} />
          <Route path="/customers/new" element={<CustomerFormPage />} />
          <Route path="/customers/:id/edit" element={<CustomerFormPage />} />
          <Route path="/customers/:id" element={<CustomerDetailPage />} />

          {/* Engineers */}
          <Route path="/engineers" element={<EngineerListPage />} />
          <Route path="/engineers/new" element={<EngineerFormPage />} />
          <Route path="/engineers/:id/edit" element={<EngineerFormPage />} />
          <Route path="/engineers/:id" element={<EngineerDetailPage />} />

          {/* Service Calls */}
          <Route path="/service-calls" element={<ServiceCallListPage />} />
          <Route path="/service-calls/new" element={<ServiceCallFormPage />} />
          <Route path="/service-calls/:id/edit" element={<ServiceCallFormPage />} />
          <Route path="/service-calls/:id" element={<ServiceCallDetailPage />} />

          {/* Other modules */}
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/backup" element={<BackupPage />} />
          <Route path="/users" element={<UserListPage />} />
          <Route path="/users/new" element={<UserFormPage />} />
          <Route path="/users/:id/edit" element={<UserFormPage />} />
        </Route>

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
