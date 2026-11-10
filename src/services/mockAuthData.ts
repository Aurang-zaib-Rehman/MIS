/**
 * Role Profiles & Mock Identities
 * Phase 3 — Madrassa Management Information System (MIS)
 *
 * Provides defined role identities for the 3 system roles:
 * - ADMIN
 * - TEACHER
 * - STUDENT
 *
 * No passwords or credential databases are stored here.
 * Real backend authentication & database authorization will be connected in a future phase.
 */

import type { AuthSession, Role } from "@/types/auth";

export const DEMO_ROLES: Role[] = ["ADMIN", "TEACHER", "STUDENT"];

export const DEMO_ACCOUNTS = {
  ADMIN: {
    email: "admin@madrassa.com",
    role: "ADMIN" as const,
  },
  TEACHER: {
    email: "teacher@madrassa.com",
    role: "TEACHER" as const,
  },
  STUDENT: {
    email: "student@madrassa.com",
    role: "STUDENT" as const,
  },
} as const;

/**
 * Role Session Profiles for 1-Click Role Access
 */
export const ROLE_PROFILES: Record<Role, AuthSession> = {
  // 1. ADMIN SUPERUSER
  ADMIN: {
    userId: "usr_admin_001",
    name: "Hazrat Maulana Mufti Mian Saeed Akbar",
    email: "admin@madrassa.com",
    role: "ADMIN",
    avatar: "/images/user/muhtamim.jpeg",
    loginTimestamp: Date.now(),
  },

  // 2. TEACHER / FACULTY
  TEACHER: {
    userId: "usr_teacher_001",
    name: "Maulana Aurang Zaib Rehman",
    email: "teacher@madrassa.com",
    role: "TEACHER",
    avatar: "/images/user/staff.jpeg",
    loginTimestamp: Date.now(),
    teacherProfile: {
      teacherId: "TCH-004",
      designation: "Senior Instructor of Arabic Grammar",
      department: "Shoba-e-Dars-e-Nizami",
      assignedClasses: ["Class 1A (Darja Oola)", "Class 2B (Darja Saniya)"],
      assignedCourses: ["Ilm-us-Sarf", "Nahw Mir", "Kafiyah"],
    },
  },

  // 3. STUDENT
  STUDENT: {
    userId: "usr_student_001",
    name: "Muhammad Abdullah Khan",
    email: "student@madrassa.com",
    role: "STUDENT",
    avatar: "/images/user/owner.png",
    loginTimestamp: Date.now(),
    studentProfile: {
      studentId: "STD-1447-042",
      rollNo: "24-DS-042",
      darja: "Darja Saniya (Year 2)",
      department: "Department of Islamic Studies",
      guardianName: "Abdur Rahman Khan",
      admissionYear: 2024,
    },
  },
};

/**
 * Returns a cloned session object for the given role
 */
export function getRoleSession(role: Role): AuthSession {
  const profile = ROLE_PROFILES[role] || ROLE_PROFILES.ADMIN;
  return {
    ...profile,
    loginTimestamp: Date.now(),
  };
}

/**
 * Mock Data Records for Testing Role & Data Isolation
 */
export interface MockStudentRecord {
  id: string;
  studentId: string;
  studentName: string;
  darja: string;
  marksObtained: number;
  totalMarks: number;
  feeStatus: "Paid" | "Pending" | "Overdue";
  duesAmount: number;
}

export const MOCK_STUDENT_RECORDS: MockStudentRecord[] = [
  {
    id: "rec_std_01",
    studentId: "STD-1447-042", // Owned by student@madrassa.com
    studentName: "Muhammad Abdullah Khan",
    darja: "Darja Saniya (Year 2)",
    marksObtained: 540,
    totalMarks: 600,
    feeStatus: "Paid",
    duesAmount: 0,
  },
  {
    id: "rec_std_02",
    studentId: "STD-1447-099", // Other student private record
    studentName: "Bilal Ahmad Farooqi",
    darja: "Darja Oola (Year 1)",
    marksObtained: 480,
    totalMarks: 600,
    feeStatus: "Overdue",
    duesAmount: 4500,
  },
];

export interface MockClassAttendanceRecord {
  id: string;
  className: string;
  courseName: string;
  teacherId: string;
  date: string;
  presentCount: number;
  totalCount: number;
}

export const MOCK_CLASS_ATTENDANCE: MockClassAttendanceRecord[] = [
  {
    id: "att_01",
    className: "Class 1A (Darja Oola)",
    courseName: "Ilm-us-Sarf",
    teacherId: "TCH-004", // Authorized for teacher@madrassa.com
    date: "2026-11-08",
    presentCount: 28,
    totalCount: 30,
  },
  {
    id: "att_02",
    className: "Class 5A (Darja Khamisa)",
    courseName: "Noor-ul-Anwar",
    teacherId: "TCH-009", // Unauthorized for teacher@madrassa.com
    date: "2026-11-08",
    presentCount: 22,
    totalCount: 24,
  },
];
