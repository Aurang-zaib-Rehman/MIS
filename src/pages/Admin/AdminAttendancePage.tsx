import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import AdminAttendanceSpeedometerCard from "@/components/admin/AdminAttendanceSpeedometerCard";
import TodaysPresentTable from "@/components/admin/TodaysPresentTable";
import TodaysAbsentTable from "@/components/admin/TodaysAbsentTable";

export default function AdminAttendancePage() {
  const [selectedMonth, setSelectedMonth] = useState("rabi-thani");

  return (
    <>
      <PageMeta
        title="Student Attendance Intelligence & Monitoring | Madrassa MIS"
        description="Comprehensive institutional student attendance gauge, monthly trends, and live present/absent student records."
      />
      <PageBreadcrumb pageTitle="Student Attendance Monitoring" />

      <div className="space-y-6">
        {/* 1. Top Section: Speedometer Type Meter + Right Top Month Filter */}
        <AdminAttendanceSpeedometerCard
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />

        {/* 2. Today's Present Student Data Table (7 entries + right bottom see more option) */}
        <TodaysPresentTable />

        {/* 3. Today's Absent Student Data Table (7 entries + right bottom see more option) */}
        <TodaysAbsentTable />
      </div>
    </>
  );
}

