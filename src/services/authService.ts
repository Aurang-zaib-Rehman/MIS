/**
 * Authentication Service
 * Phase 3 — Madrassa Management Information System (MIS)
 *
 * Provides a clean, abstracted asynchronous API for authentication and session management.
 * In this phase, this service interacts with mock credentials and localStorage.
 * When real backend APIs and JWT authentication are introduced later, ONLY this service
 * needs to be updated with fetch/axios calls; the UI components and AuthContext will remain untouched.
 */

import type { AuthSession, LoginCredentials, Role } from "@/types/auth";
import {
  createSessionFromAccount,
  MOCK_CLASS_ATTENDANCE,
  MOCK_STUDENT_RECORDS,
  MOCK_USERS,
  type MockClassAttendanceRecord,
  type MockStudentRecord,
} from "./mockAuthData";

// Centralized, versioned localStorage key for authentication sessions
export const AUTH_STORAGE_KEY = "madrassa_auth_session_v1";

const VALID_ROLES: Role[] = ["ADMIN", "TEACHER", "STUDENT"];

export class AuthService {
  /**
   * Validates if a stored object adheres strictly to the AuthSession schema
   */
  public static validateSession(data: unknown): data is AuthSession {
    if (!data || typeof data !== "object") {
      return false;
    }

    const candidate = data as Record<string, unknown>;

    const hasValidFields =
      typeof candidate.userId === "string" &&
      typeof candidate.name === "string" &&
      typeof candidate.email === "string" &&
      typeof candidate.role === "string" &&
      VALID_ROLES.includes(candidate.role as Role) &&
      typeof candidate.avatar === "string" &&
      typeof candidate.loginTimestamp === "number";

    return hasValidFields;
  }

  /**
   * Retrieves and safely validates the active session from localStorage
   */
  public static getCurrentSession(): AuthSession | null {
    if (typeof window === "undefined" && typeof localStorage === "undefined") {
      return null;
    }

    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) {
        return null;
      }

      const parsed = JSON.parse(raw);
      if (!this.validateSession(parsed)) {
        // Corrupted, outdated, or tampered session data — purge safely
        console.warn("[AuthService] Invalid or corrupted session detected. Purging session.");
        this.clearSession();
        return null;
      }

      return parsed;
    } catch (error) {
      console.error("[AuthService] Failed to parse session JSON from localStorage:", error);
      this.clearSession();
      return null;
    }
  }

  /**
   * Authenticates against mock credentials and creates a session
   */
  public static async login(credentials: LoginCredentials): Promise<AuthSession> {
    // Simulate slight asynchronous network latency (150ms)
    await new Promise((resolve) => setTimeout(resolve, 150));

    const normalizedEmail = (credentials.email || "").trim().toLowerCase();
    const password = credentials.password || "";

    if (!normalizedEmail || !password) {
      throw new Error("Email and password are required.");
    }

    const account = MOCK_USERS.find(
      (u) => u.email.toLowerCase() === normalizedEmail && u.passwordHash === password,
    );

    if (!account) {
      throw new Error("Invalid email or password. Please verify your credentials.");
    }

    // Create session (explicitly excludes passwords)
    const session = createSessionFromAccount(account);

    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    } catch (storageError) {
      console.error("[AuthService] Failed to persist session to localStorage:", storageError);
    }

    return session;
  }

  /**
   * Terminates the active session and cleans up localStorage
   */
  public static async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 50));
    this.clearSession();
  }

  /**
   * Clears the authentication key from localStorage
   */
  public static clearSession(): void {
    if (typeof window !== "undefined" || typeof localStorage !== "undefined") {
      try {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } catch (e) {
        console.error("[AuthService] Error clearing localStorage session:", e);
      }
    }
  }

  // =========================================================================
  // Role & Data Isolation Demonstration Methods
  // =========================================================================

  /**
   * Demonstrates student data isolation:
   * - Students can ONLY view their own records.
   * - Teachers cannot access student financial/grade ledger directly without assignment.
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

    // Other roles are blocked from student private ledger
    return [];
  }

  /**
   * Demonstrates teacher class assignment isolation:
   * - Teachers can ONLY view and mark attendance for their assigned classes.
   * - Students cannot access attendance management.
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

    // Students have no access to attendance administration
    return [];
  }
}
