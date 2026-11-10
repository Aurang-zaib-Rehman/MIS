/**
 * Centralized Role-Based Access Control (RBAC) Configuration
 * Phase 3 — Madrassa Management Information System (MIS)
 */

import type { Permission, Role } from "@/types/auth";

/**
 * Role Permission Matrix
 */
export const ROLE_PERMISSIONS: Record<Role, readonly Permission[]> = {
  ADMIN: [
    // Superuser: Full unrestricted administrative access
    "manage:students",
    "manage:admissions",
    "manage:departments",
    "manage:darjat",
    "manage:courses",
    "manage:classes",
    "manage:timetables",
    "manage:teachers",
    "manage:teacher_attendance",
    "manage:payroll",
    "manage:examinations",
    "manage:fees",
    "manage:fee_challans",
    "manage:expenses",
    "manage:fundraising",
    "manage:reports",
    "manage:settings",
    "manage:users",
    "view:assigned_courses",
    "view:assigned_classes",
    "view:teacher_timetable",
    "view:own_teacher_attendance",
    "mark:student_attendance",
    "enter:student_marks",
    "view:class_examination_results",
    "view:own_student_profile",
    "view:own_darja",
    "view:own_enrolled_courses",
    "view:own_student_timetable",
    "view:own_student_attendance",
    "view:own_examination_marks",
    "view:own_examination_results",
    "view:own_fee_challans",
    "view:own_outstanding_dues",
    "view:notifications",
    "view:academic_calendar",
    "access:dashboard",
  ],

  TEACHER: [
    // Authorized academic activities only
    "view:assigned_courses",
    "view:assigned_classes",
    "view:teacher_timetable",
    "view:own_teacher_attendance",
    "mark:student_attendance",
    "enter:student_marks",
    "view:class_examination_results",
    "view:notifications",
    "view:academic_calendar",
  ],

  STUDENT: [
    // Student self-service activities only
    "view:own_student_profile",
    "view:own_darja",
    "view:own_enrolled_courses",
    "view:own_student_timetable",
    "view:own_student_attendance",
    "view:own_examination_marks",
    "view:own_examination_results",
    "view:own_fee_challans",
    "view:own_outstanding_dues",
    "view:notifications",
    "view:academic_calendar",
  ],
} as const;

/**
 * Default safe landing destination by role
 * (Temporary safe landing routes prior to Phase 4 dedicated dashboards)
 */
export const ROLE_DEFAULT_REDIRECTS: Record<Role, string> = {
  ADMIN: "/dashboard",
  TEACHER: "/calendar",
  STUDENT: "/profile",
};

/**
 * Route Authorization Map
 * Explicitly defines which roles are permitted to access each internal path.
 */
export const ROUTE_ROLE_ACCESS: Record<string, Role[]> = {
  // Admin Superuser Exclusive Modules
  "/dashboard": ["ADMIN"],
  "/alerts": ["ADMIN"],
  "/avatars": ["ADMIN"],
  "/badge": ["ADMIN"],
  "/buttons": ["ADMIN"],
  "/images": ["ADMIN"],
  "/line-chart": ["ADMIN"],
  "/bar-chart": ["ADMIN"],
  "/form-elements": ["ADMIN"], // Developer UI inputs showcase — restricted to Admin
  "/basic-tables": ["ADMIN"], // Developer UI table showcase — restricted to Admin
  "/blank": ["ADMIN"], // Generic template blank page — restricted to Admin

  // Shared Academic & User Routes
  "/calendar": ["ADMIN", "TEACHER", "STUDENT"], // Academic calendar (Admin manages; Teacher/Student view-only)
  "/profile": ["ADMIN", "TEACHER", "STUDENT"], // Personal user profile & academic credentials
};

/**
 * Checks whether a given role holds a specific permission
 */
export function hasRolePermission(role: Role, permission: Permission): boolean {
  const permissions = ROLE_PERMISSIONS[role];
  if (!permissions) {
    return false;
  }
  return permissions.includes(permission);
}

/**
 * Checks whether a given role is authorized to visit a pathname
 * Denies access by default for any unknown or unregistered route (including for ADMIN).
 */
export function isRouteAuthorizedForRole(role: Role, pathname: string): boolean {
  // Normalize pathname to remove trailing slash
  const cleanPath = pathname.replace(/\/$/, "") || "/";

  // Look up route in the explicit application access map
  const allowedRoles = ROUTE_ROLE_ACCESS[cleanPath];
  if (!allowedRoles) {
    // Unknown or unmapped route: denied by default for ALL roles (including ADMIN).
    // Application routes must be explicitly registered in ROUTE_ROLE_ACCESS.
    return false;
  }

  return allowedRoles.includes(role);
}
