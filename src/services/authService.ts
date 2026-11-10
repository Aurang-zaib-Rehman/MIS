/**
 * Authentication Service
 * Phase 3 — Madrassa Management Information System (MIS)
 *
 * In this development phase, 1-click role selection (ADMIN, TEACHER, STUDENT)
 * is used to access corresponding dashboards without credentials.
 *
 * All mock passwords, signup mockups, and localStorage login data have been permanently removed.
 * Only tab-scoped sessionStorage is used for active role retention across browser refreshes.
 * When real backend APIs are introduced, this service will be wired to backend endpoints.
 */

import type { AuthSession, LoginCredentials, Role } from "@/types/auth";
import {
  getRoleSession,
  MOCK_CLASS_ATTENDANCE,
  MOCK_STUDENT_RECORDS,
  ROLE_PROFILES,
  type MockClassAttendanceRecord,
  type MockStudentRecord,
} from "./mockAuthData";

// Tab-scoped key for active development role (Never stores credentials or passwords)
export const DEV_ROLE_SESSION_KEY = "madrassa_dev_role";
// Legacy localStorage key to purge permanently
export const LEGACY_STORAGE_KEY = "madrassa_auth_session_v1";

const VALID_ROLES: Role[] = ["ADMIN", "TEACHER", "STUDENT"];

export class AuthService {
  /**
   * Permanently purge any legacy mock auth data from localStorage
   */
  public static purgeLegacyStorage(): void {
    if (typeof localStorage !== "undefined") {
      try {
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      } catch (e) {
        console.warn("[AuthService] Could not clear legacy localStorage key:", e);
      }
    }
  }

  /**
   * Retrieves the currently active role session from tab sessionStorage
   */
  public static getCurrentSession(): AuthSession | null {
    this.purgeLegacyStorage();

    if (typeof sessionStorage === "undefined") {
      return null;
    }

    try {
      const storedRole = sessionStorage.getItem(DEV_ROLE_SESSION_KEY) as Role | null;
      if (!storedRole || !VALID_ROLES.includes(storedRole)) {
        return null;
      }

      return getRoleSession(storedRole);
    } catch (error) {
      console.error("[AuthService] Failed to read active role from sessionStorage:", error);
      return null;
    }
  }

  /**
   * 1-Click Role Login: Activates the requested role without credentials
   */
  public static loginAsRole(role: Role): AuthSession {
    this.purgeLegacyStorage();

    const targetRole: Role = VALID_ROLES.includes(role) ? role : "ADMIN";
    const session = getRoleSession(targetRole);

    if (typeof sessionStorage !== "undefined") {
      try {
        sessionStorage.setItem(DEV_ROLE_SESSION_KEY, targetRole);
      } catch (e) {
        console.error("[AuthService] Failed to persist role to sessionStorage:", e);
      }
    }

    return session;
  }

  /**
   * Standard login handler for compatibility (maps email/role directly to role session)
   */
  public static async login(credentials: LoginCredentials): Promise<AuthSession> {
    this.purgeLegacyStorage();

    const email = (credentials.email || "").toLowerCase().trim();
    let role: Role = "ADMIN";

    if (email.includes("teacher")) {
      role = "TEACHER";
    } else if (email.includes("student")) {
      role = "STUDENT";
    }

    return this.loginAsRole(role);
  }

  /**
   * Terminates active session and clears storage
   */
  public static async logout(): Promise<void> {
    this.clearSession();
  }

  /**
   * Clears all session and legacy storage
   */
  public static clearSession(): void {
    this.purgeLegacyStorage();

    if (typeof sessionStorage !== "undefined") {
      try {
        sessionStorage.removeItem(DEV_ROLE_SESSION_KEY);
      } catch (e) {
        console.error("[AuthService] Failed to clear sessionStorage role:", e);
      }
    }
  }

  /**
   * Direct role profile getter
   */
  public static getRoleProfile(role: Role): AuthSession {
    return ROLE_PROFILES[role] || ROLE_PROFILES.ADMIN;
  }

  // =========================================================================
  // Role & Data Isolation Demonstration Methods
  // =========================================================================

  /**
   * Demonstrates student data isolation:
   * - Students can ONLY view their own records.
   * - Teachers cannot access student private financial ledger directly.
   * - Admin can view all records.
   */
  public static getStudentRecords(session: AuthSession): MockStudentRecord[] {
    if (session.role === "ADMIN") {
      return MOCK_STUDENT_RECORDS;
    }

    if (session.role === "STUDENT" && session.studentProfile) {
      return MOCK_STUDENT_RECORDS.filter(
        (rec) => rec.studentId === session.studentProfile?.studentId,
      );
    }

    return [];
  }

  /**
   * Demonstrates teacher class assignment isolation:
   * - Teachers can ONLY view their assigned classes.
   * - Admin can view all attendance logs.
   */
  public static getClassAttendanceRecords(session: AuthSession): MockClassAttendanceRecord[] {
    if (session.role === "ADMIN") {
      return MOCK_CLASS_ATTENDANCE;
    }

    if (session.role === "TEACHER" && session.teacherProfile) {
      return MOCK_CLASS_ATTENDANCE.filter(
        (rec) => rec.teacherId === session.teacherProfile?.teacherId,
      );
    }

    return [];
  }
}
