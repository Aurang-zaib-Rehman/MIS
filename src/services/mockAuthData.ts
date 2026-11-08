/**
 * Mock Authentication Data & Test Accounts
 * Phase 3 — Madrassa Management Information System (MIS)
 *
 * IMPORTANT NOTE / SECURITY WARNING:
 * This file contains development-only demo accounts and mock identities.
 * These credentials and records are stored in frontend code solely for temporary
 * development, UI prototyping, and testing prior to backend/database implementation.
 * In production, authentication and authorization MUST be validated by a secure backend server.
 */

import type { AuthSession, Role, StudentProfileData, TeacherProfileData } from "@/types/auth";

export interface MockUserAccount {
  id: string;
  name: string;
  email: string;
  passwordHash: string; // Plaintext for frontend mock comparison only
  role: Role;
  avatar: string;
  teacherProfile?: TeacherProfileData;
  studentProfile?: StudentProfileData;
}

/**
 * Predefined Development Demo Accounts for Testing
 */
export const DEMO_ACCOUNTS = {
  ADMIN: {
    email: "admin@madrassa.com",
    password: "Admin@123",
    role: "ADMIN" as const,
  },
  TEACHER: {
    email: "teacher@madrassa.com",
    password: "Teacher@123",
    role: "TEACHER" as const,
  },
  STUDENT: {
    email: "student@madrassa.com",
    password: "Student@123",
    role: "STUDENT" as const,
  },
} as const;

/**
 * Three Predefined Development Demo Accounts
 */
export const MOCK_USERS: MockUserAccount[] = [
  // 1. ADMIN SUPERUSER
  {
    id: "usr_admin_001",
    name: "Hazrat Maulana Mufti Mian Saeed Akbar",
    email: "admin@madrassa.com",
    passwordHash: "Admin@123",
    role: "ADMIN",
    avatar: "/images/user/muhtamim.jpeg",
  },

  // 2. TEACHER
  {
    id: "usr_teacher_001",
    name: "Maulana Aurang Zaib Rehman",
    email: "teacher@madrassa.com",
    passwordHash: "Teacher@123",
    role: "TEACHER",
    avatar: "/images/user/staff.jpeg",
    teacherProfile: {
      teacherId: "TCH-004",
      designation: "Senior Instructor of Arabic Grammar",
      department: "Shoba-e-Dars-e-Nizami",
      assignedClasses: ["Class 1A (Darja Oola)", "Class 2B (Darja Saniya)"],
      assignedCourses: ["Ilm-us-Sarf", "Nahw Mir", "Kafiyah"],
    },
  },

  // 3. STUDENT
  {
    id: "usr_student_001",
    name: "Muhammad Abdullah Khan",
    email: "student@madrassa.com",
    passwordHash: "Student@123",
    role: "STUDENT",
    avatar: "/images/user/owner.png",
    studentProfile: {
      studentId: "STD-1447-042",
      rollNo: "24-DS-042",
      darja: "Darja Saniya (Year 2)",
      department: "Department of Islamic Studies",
      guardianName: "Abdur Rahman Khan",
      admissionYear: 2024,
    },
  },
];

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

/**
 * Creates an AuthSession object from a MockUserAccount
 * (Excludes passwordHash)
 */
export function createSessionFromAccount(account: MockUserAccount): AuthSession {
  return {
    userId: account.id,
    name: account.name,
    email: account.email,
    role: account.role,
    avatar: account.avatar,
    loginTimestamp: Date.now(),
    teacherProfile: account.teacherProfile,
    studentProfile: account.studentProfile,
  };
}
