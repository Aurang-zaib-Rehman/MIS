import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import DangerZone from "@/components/UserProfile/DangerZone";
import Security from "@/components/UserProfile/Security";
import UserAddressCard from "@/components/UserProfile/UserAddressCard";
import UserMetaCard from "@/components/UserProfile/UserMetaCard";
import StudentIdCard from "@/components/student/StudentIdCard";
import TeacherIdCard from "@/components/teacher/TeacherIdCard";
import TeacherOwnAttendanceCard from "@/components/teacher/TeacherOwnAttendanceCard";
import TeacherSalaryCard from "@/components/teacher/TeacherSalaryCard";
import { useAuth } from "@/hooks/useAuth";
import { CheckCircleIcon, DollarLineIcon, UserCircleIcon } from "@/icons";

export default function UserProfiles() {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "ADMIN";
  const isStudent = currentUser?.role === "STUDENT";
  const isTeacher = currentUser?.role === "TEACHER";

  const [teacherView, setTeacherView] = useState<
    "profile" | "attendance" | "salary"
  >("profile");

  return (
    <>
      <PageMeta
        title="Profile & Academic Credentials | Madrassa MIS"
        description="User profile and academic credentials for Madrassa Management Information System"
      />
      <PageBreadcrumb pageTitle="Academic Profile" />

      {/* Teacher Role Navigation Bar (Two Dedicated Navigation Buttons for Attendance & Salary) */}
      {isTeacher && (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl border border-gray-200 bg-white p-4 shadow-xs dark:border-gray-800 dark:bg-white/3">
          <div>
            <h3 className="text-sm font-bold text-gray-900 sm:text-base dark:text-white">
              Faculty Services Navigation
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Switch between personal attendance logs, monthly salary slips, and profile credentials.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setTeacherView("attendance")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-xs ${
                teacherView === "attendance"
                  ? "bg-brand-600 text-white dark:bg-brand-500"
                  : "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-brand-50 hover:text-brand-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-brand-500/20"
              }`}
            >
              <CheckCircleIcon className="size-4" />
              <span>My Attendance</span>
            </button>

            <button
              type="button"
              onClick={() => setTeacherView("salary")}
              className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-xs ${
                teacherView === "salary"
                  ? "bg-brand-600 text-white dark:bg-brand-500"
                  : "border border-gray-200 bg-gray-50 text-gray-700 hover:bg-brand-50 hover:text-brand-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-brand-500/20"
              }`}
            >
              <DollarLineIcon className="size-4" />
              <span>My Salary</span>
            </button>

            {teacherView !== "profile" && (
              <button
                type="button"
                onClick={() => setTeacherView("profile")}
                className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <UserCircleIcon className="size-4" />
                <span>Profile Overview</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Dynamic Content Views */}
      {isTeacher && teacherView === "attendance" ? (
        <TeacherOwnAttendanceCard />
      ) : isTeacher && teacherView === "salary" ? (
        <TeacherSalaryCard />
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/3">
          <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
            User Identity & Credentials
          </h3>
          <div className="space-y-6">
            {isStudent && <StudentIdCard />}
            {isTeacher && <TeacherIdCard />}
            <UserMetaCard />
            <UserAddressCard />
            <Security />
            {isAdmin && <DangerZone />}
          </div>
        </div>
      )}
    </>
  );
}
