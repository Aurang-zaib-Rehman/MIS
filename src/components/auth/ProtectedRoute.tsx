/**
 * Protected Route & Role-Based Route Guard
 * Phase 3 — Madrassa Management Information System (MIS)
 */

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router";
import { useAuth } from "@/context/AuthContext";
import type { Permission, Role } from "@/types/auth";
import { isRouteAuthorizedForRole } from "@/config/permissions";

interface ProtectedRouteProps {
  children?: React.ReactNode;
  requiredRoles?: Role | Role[];
  requiredPermission?: Permission;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRoles,
  requiredPermission,
}) => {
  const { currentUser, isAuthenticated, isLoading, hasRole, hasPermission } = useAuth();
  const location = useLocation();

  // 1. Render smooth loader while restoring authentication session from storage
  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Verifying Session Credentials...
          </p>
        </div>
      </div>
    );
  }

  // 2. Unauthenticated: Redirect to /signin preserving the requested URL in state
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // 3. Explicit Required Roles Guard
  if (requiredRoles) {
    const hasAuthorizedRole = hasRole(requiredRoles);
    if (!hasAuthorizedRole) {
      return <Navigate to="/unauthorized" state={{ attemptedPath: location.pathname }} replace />;
    }
  }

  // 4. Explicit Required Permission Guard
  if (requiredPermission) {
    const hasAuthorizedPermission = hasPermission(requiredPermission);
    if (!hasAuthorizedPermission) {
      return <Navigate to="/unauthorized" state={{ attemptedPath: location.pathname }} replace />;
    }
  }

  // 5. Automatic Route Matrix Authorization Check for current URL
  const isAuthorized = isRouteAuthorizedForRole(currentUser.role, location.pathname);
  if (!isAuthorized) {
    return <Navigate to="/unauthorized" state={{ attemptedPath: location.pathname }} replace />;
  }

  // 6. Authorized: Render matched child routes or outlet
  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
