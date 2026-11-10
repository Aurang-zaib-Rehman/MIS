/**
 * Authentication and RBAC Type Definitions
 * Phase 3 — Madrassa Management Information System (MIS)
 */

export type Role = "ADMIN" | "TEACHER" | "STUDENT";

export type Permission =
  // Admin Core Permissions
  | "manage:students"
  | "manage:admissions"
  | "manage:departments"
  | "manage:darjat"
  | "manage:courses"
  | "manage:classes"
  | "manage:timetables"
  | "manage:teachers"
  | "manage:teacher_attendance"
  | "manage:payroll"
  | "manage:examinations"
  | "manage:fees"
  | "manage:fee_challans"
  | "manage:expenses"
  | "manage:fundraising"
  | "manage:reports"
  | "manage:settings"
  | "manage:users"
  // Teacher Permissions
  | "view:assigned_courses"
  | "view:assigned_classes"
  | "view:teacher_timetable"
  | "view:own_teacher_attendance"
  | "mark:student_attendance"
  | "enter:student_marks"
  | "view:class_examination_results"
  // Student Permissions
  | "view:own_student_profile"
  | "view:own_darja"
  | "view:own_enrolled_courses"
  | "view:own_student_timetable"
  | "view:own_student_attendance"
  | "view:own_examination_marks"
  | "view:own_examination_results"
  | "view:own_fee_challans"
  | "view:own_outstanding_dues"
  // Common / Shared Permissions
  | "view:notifications"
  | "view:academic_calendar"
  | "access:dashboard";

/**
 * Teacher-specific mock assignment profile
 */
export interface TeacherProfileData {
  teacherId: string;
  designation: string;
  department: string;
  assignedClasses: string[];
  assignedCourses: string[];
}

/**
 * Student-specific mock enrollment profile
 */
export interface StudentProfileData {
  studentId: string;
  rollNo: string;
  darja: string;
  department: string;
  guardianName: string;
  admissionYear: number;
}

/**
 * Session data stored in localStorage (NEVER includes passwords)
 */
export interface AuthSession {
  userId: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  loginTimestamp: number;
  // Role-specific mock identity attributes
  teacherProfile?: TeacherProfileData;
  studentProfile?: StudentProfileData;
}

/**
 * Credentials passed during sign-in
 */
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Authentication Context contract
 */
export interface AuthContextType {
  currentUser: AuthSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginAsRole: (role: Role) => AuthSession;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; error?: string; session?: AuthSession }>;
  logout: () => Promise<void>;
  hasRole: (roles: Role | Role[]) => boolean;
  hasPermission: (permission: Permission) => boolean;
  getRoleDefaultPath: (role?: Role) => string;
}
