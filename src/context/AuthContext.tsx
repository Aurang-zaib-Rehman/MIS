/**
 * Authentication Context & Provider
 * Phase 3 — Madrassa Management Information System (MIS)
 */

import React, { createContext, useState, useCallback } from "react";
import type { AuthContextType, AuthSession, LoginCredentials, Permission, Role } from "@/types/auth";
import { AuthService } from "@/services/authService";
import { hasRolePermission, ROLE_DEFAULT_REDIRECTS } from "@/config/permissions";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Restore authenticated session synchronously from localStorage on initialization
  const [currentUser, setCurrentUser] = useState<AuthSession | null>(() => {
    try {
      return AuthService.getCurrentSession();
    } catch (err) {
      console.error("[AuthProvider] Error restoring session on startup:", err);
      return null;
    }
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Login handler
  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const session = await AuthService.login(credentials);
      setCurrentUser(session);
      return { success: true, session };
    } catch (error) {
      const message = error instanceof Error ? error.message : "Authentication failed.";
      return { success: false, error: message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout handler
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await AuthService.logout();
      setCurrentUser(null);
    } catch (error) {
      console.error("[AuthProvider] Error during logout:", error);
      AuthService.clearSession();
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Role validation helper
  const hasRole = useCallback(
    (roles: Role | Role[]): boolean => {
      if (!currentUser) return false;
      const targetRoles = Array.isArray(roles) ? roles : [roles];
      return targetRoles.includes(currentUser.role);
    },
    [currentUser],
  );

  // Permission validation helper
  const hasPermission = useCallback(
    (permission: Permission): boolean => {
      if (!currentUser) return false;
      return hasRolePermission(currentUser.role, permission);
    },
    [currentUser],
  );

  // Returns the default landing path for the specified or current role
  const getRoleDefaultPath = useCallback(
    (role?: Role): string => {
      const targetRole = role || currentUser?.role;
      if (!targetRole) return "/signin";
      return ROLE_DEFAULT_REDIRECTS[targetRole] || "/dashboard";
    },
    [currentUser],
  );

  const value: AuthContextType = {
    currentUser,
    isAuthenticated: Boolean(currentUser),
    isLoading,
    login,
    logout,
    hasRole,
    hasPermission,
    getRoleDefaultPath,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Re-export useAuth hook for backwards compatibility
export { useAuth } from "@/hooks/useAuth";

export default AuthContext;
