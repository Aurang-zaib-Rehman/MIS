/**
 * 403 Unauthorized / Access Restricted Page
 * Phase 3 — Madrassa Management Information System (MIS)
 */

import React from "react";
import { Link, useNavigate } from "react-router";
import PageMeta from "@/components/common/PageMeta";
import GridShape from "@/components/common/GridShape";
import Badge from "@/components/ui/badge/Badge";
import { useAuth } from "@/context/AuthContext";
import { LockIcon, ChevronLeftIcon } from "@/icons";

export const Unauthorized: React.FC = () => {
  const { currentUser, getRoleDefaultPath, logout } = useAuth();
  const navigate = useNavigate();

  const handleSwitchAccount = async () => {
    await logout();
    navigate("/signin");
  };

  const roleColorMap = {
    ADMIN: "primary" as const,
    TEACHER: "info" as const,
    STUDENT: "success" as const,
  };

  const userRole = currentUser?.role || "STUDENT";

  return (
    <>
      <PageMeta
        title="403 Access Denied | Madrassa MIS"
        description="Access restricted. You do not possess the required permissions to access this administrative module."
      />
      <div className="relative z-1 flex min-h-screen flex-col items-center justify-center overflow-hidden p-6 bg-gray-50 dark:bg-gray-950">
        <GridShape />
        <div className="mx-auto w-full max-w-lg text-center">
          {/* Security Shield Icon */}
          <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-error-50 text-error-500 shadow-theme-sm dark:bg-error-500/10 dark:text-error-400 mb-6">
            <LockIcon className="size-10" />
          </div>

          <h1 className="font-outfit text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
            403 — Access Restricted
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
            You do not possess the role permissions required to access this administrative module.
            Access is enforced under centralized Role-Based Access Control (RBAC).
          </p>

          {/* Current Identity Summary */}
          {currentUser && (
            <div className="mx-auto mt-6 max-w-sm rounded-xl border border-gray-200 bg-white p-4 text-start shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                Current Authenticated Identity
              </span>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <h4 className="font-outfit text-sm font-bold text-gray-900 dark:text-white">
                    {currentUser.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser.email}</p>
                </div>
                <Badge color={roleColorMap[userRole]} size="sm">
                  {currentUser.role}
                </Badge>
              </div>
            </div>
          )}

          {/* Navigation & Recovery Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to={getRoleDefaultPath()}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white shadow-theme-xs transition-colors hover:bg-brand-600 sm:w-auto"
            >
              <ChevronLeftIcon className="size-4 rtl:rotate-180" />
              <span>Back to Authorized Area</span>
            </Link>

            <button
              onClick={handleSwitchAccount}
              className="inline-flex w-full items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-700 shadow-theme-xs transition-colors hover:bg-gray-50 sm:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Switch Account
            </button>
          </div>
        </div>

        {/* Footer info */}
        <p className="absolute inset-s-1/2 bottom-6 -translate-x-1/2 text-center text-xs text-gray-400 rtl:translate-x-1/2 dark:text-gray-600">
          Madrasa Uloom-e-Islamia Management Information System &bull; RBAC Protected
        </p>
      </div>
    </>
  );
};

export default Unauthorized;

