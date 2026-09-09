import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermission?: { module: string; action: string };
}

export function ProtectedRoute({ children, requiredPermission }: ProtectedRouteProps) {
  // Mock auth check
  const isAuthenticated = true;
  const mustChangePassword = false;
  const hasPermission = () => true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (mustChangePassword) {
    // Usually handled via modal or separate route, here we'll let it pass for the UI demo
  }

  if (requiredPermission && !hasPermission()) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
