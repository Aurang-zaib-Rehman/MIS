import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { COURSE_ATTENDANCE_SUMMARY, RECENT_ATTENDANCE_LOG } from "@/services/studentData";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { CheckCircleIcon, ClockIcon } from "@/icons";

export default function StudentAttendance() {
  const [activeTab, setActiveTab] = useState<"summary" | "daily" | "simulator">("summary");
  const [summaryFilter, setSummaryFilter] = useState<"ALL" | "SAFE" | "WARNING">("ALL");
  const [logFilter, setLogFilter] = useState<"ALL" | "Present" | "Late" | "Leave">("ALL");
  const [simulatedClasses, setSimulatedClasses] = useState<number>(10);

  const totalClasses = COURSE_ATTENDANCE_SUMMARY.reduce((acc, curr) => acc + curr.total, 0);
  const totalPresents = COURSE_ATTENDANCE_SUMMARY.reduce((acc, curr) => acc + curr.presents, 0);
  const totalAbsents = COURSE_ATTENDANCE_SUMMARY.reduce((acc, curr) => acc + curr.absents, 0);
  const totalLates = COURSE_ATTENDANCE_SUMMARY.reduce((acc, curr) => acc + curr.lates, 0);
  const overallPercent = Math.round((totalPresents / totalClasses) * 1000) / 10;

  // Simulator calculation
  const simulatedTotal = totalClasses + simulatedClasses;
  const simulatedPresents = totalPresents + simulatedClasses;
  const simulatedPercent = Math.round((simulatedPresents / simulatedTotal) * 1000) / 10;

  const filteredSummary = COURSE_ATTENDANCE_SUMMARY.filter((row) => {
    if (summaryFilter === "SAFE") return row.presencePercent >= 75;
    if (summaryFilter === "WARNING") return row.presencePercent < 75;
    return true;
  });

  const filteredLogs = RECENT_ATTENDANCE_LOG.filter((log) => {
    if (logFilter === "ALL") return true;
    return log.status === logFilter;
  });

  return (
    <>
      <PageMeta
        title="Course Attendance Summary | Madrassa MIS"
        description="Comprehensive course-wise attendance ledger, presence percentages, and examination eligibility."
      />
      <PageBreadcrumb pageTitle="Course Attendance Summary" />

      <div className="space-y-6">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-white/3">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Total Classes Conducted
            </span>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {totalClasses} Periods
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              7 Active Kutub (Courses)
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-white/3">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Verified Presents
            </span>
            <p className="mt-1 text-2xl font-bold text-success-600 dark:text-success-400">
              {totalPresents} Periods
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Morning shift check-ins
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-white/3">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Tardies & Absences
            </span>
            <p className="mt-1 text-2xl font-bold text-error-500 dark:text-error-400">
              {totalAbsents} Abs / {totalLates} Lates
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Includes excused medical leaves
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-white/3">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Overall Presence
            </span>
            <p className="mt-1 text-2xl font-bold text-brand-600 dark:text-brand-400">
              {overallPercent}%
            </p>
            <div className="mt-1">
              <Badge color="success" size="sm">
                Exam Eligible (&ge; 75%)
              </Badge>
            </div>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-2 dark:border-gray-800">
          <button
            type="button"
            onClick={() => setActiveTab("summary")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "summary"
                ? "bg-brand-500 text-white shadow-xs"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            All Courses Attendance Summary (Ledger)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("daily")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "daily"
                ? "bg-brand-500 text-white shadow-xs"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            Recent Daily Check-In Logs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("simulator")}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "simulator"
                ? "bg-brand-500 text-white shadow-xs"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            Attendance Simulator & Planner
          </button>
        </div>

        {/* Tab 1: All Courses Attendance Summary — Matching Uploaded Image 2 */}
        {activeTab === "summary" && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-white/3 overflow-hidden">
            {/* Top Blue Header Band */}
            <div className="bg-brand-600 px-5 py-3.5 text-white dark:bg-brand-700 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-bold">All Courses Attendance Summary</h2>
                <span className="text-xs text-brand-100">
                  Academic Session 1446-1447 AH &bull; Darja Saniya
                </span>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() => setSummaryFilter("ALL")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    summaryFilter === "ALL" ? "bg-white text-brand-700" : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  All ({COURSE_ATTENDANCE_SUMMARY.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSummaryFilter("SAFE")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    summaryFilter === "SAFE" ? "bg-emerald-500 text-white" : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  Safe (&ge;75%)
                </button>
                <button
                  type="button"
                  onClick={() => setSummaryFilter("WARNING")}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                    summaryFilter === "WARNING" ? "bg-amber-400 text-gray-900" : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  Needs Attention (&lt;75%)
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="max-w-full overflow-x-auto p-2">
              <Table className="min-w-full">
                <TableHeader className="border-b border-gray-100 dark:border-gray-800">
                  <TableRow>
                    <TableCell
                      isHeader
                      className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                    >
                      S.No
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                    >
                      Course Code
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                    >
                      Course Title
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                    >
                      Total
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                    >
                      Presents
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                    >
                      Absents
                    </TableCell>
                    <TableCell
                      isHeader
                      className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300 min-w-64"
                    >
                      Presence Percent
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                  {filteredSummary.map((row) => {
                    const isEligible = row.presencePercent >= 75;

                    return (
                      <TableRow key={row.courseCode} className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                        <TableCell className="px-4 py-3.5 text-start text-xs text-gray-500 dark:text-gray-400">
                          {row.sNo}
                        </TableCell>
                        <TableCell className="px-4 py-3.5 text-start text-xs font-semibold text-brand-600 dark:text-brand-400">
                          {row.courseCode}
                        </TableCell>
                        <TableCell className="px-4 py-3.5 text-start text-xs font-medium text-gray-900 dark:text-white">
                          <div className="flex items-center justify-between gap-2">
                            <span>{row.courseTitle}</span>
                            <span className="text-[11px] font-arabic text-gray-400 dark:text-gray-500">
                              {row.arabicTitle}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="px-4 py-3.5 text-start text-xs text-gray-700 dark:text-gray-300">
                          {row.total}
                        </TableCell>
                        <TableCell className="px-4 py-3.5 text-start text-xs font-semibold text-success-600 dark:text-success-400">
                          {row.presents}
                        </TableCell>
                        <TableCell className="px-4 py-3.5 text-start text-xs font-semibold text-error-500 dark:text-error-400">
                          {row.absents}
                        </TableCell>
                        <TableCell className="px-4 py-3.5 text-start">
                          {/* Visual Percentage Bar — Matching Uploaded Image 2 */}
                          <div className="relative flex items-center h-6 w-full max-w-sm rounded-sm bg-gray-100 overflow-hidden dark:bg-gray-700">
                            <div
                              className={`h-full flex items-center justify-center text-[11px] font-bold text-white transition-all duration-300 ${
                                isEligible
                                  ? "bg-emerald-700 dark:bg-emerald-600"
                                  : "bg-amber-400 text-gray-900 dark:bg-amber-500"
                              }`}
                              style={{ width: `${row.presencePercent}%` }}
                            >
                              {row.presencePercent}%
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Tab 2: Daily Attendance Check-In Logs */}
        {activeTab === "daily" && (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-white/3 overflow-hidden">
            <div className="border-b border-gray-100 p-4 dark:border-gray-800 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">
                  Recent Period-by-Period Check-In Log
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Daily timestamps recorded by faculty attendance marker
                </p>
              </div>

              {/* Status Filter */}
              <div className="flex gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
                {(["ALL", "Present", "Late", "Leave"] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setLogFilter(filter)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      logFilter === filter
                        ? "bg-white text-brand-600 shadow-xs dark:bg-gray-700 dark:text-white"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-full overflow-x-auto">
              <Table className="min-w-full">
                <TableHeader className="bg-gray-50/60 dark:bg-gray-800/40">
                  <TableRow>
                    <TableCell isHeader className="px-4 py-3 text-start text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Date & Day
                    </TableCell>
                    <TableCell isHeader className="px-4 py-3 text-start text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Hijri Date
                    </TableCell>
                    <TableCell isHeader className="px-4 py-3 text-start text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Class & Period
                    </TableCell>
                    <TableCell isHeader className="px-4 py-3 text-start text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Recorded Timestamp
                    </TableCell>
                    <TableCell isHeader className="px-4 py-3 text-start text-xs font-semibold text-gray-600 dark:text-gray-300">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHeader>

                <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                  {filteredLogs.map((log, idx) => (
                    <TableRow key={idx} className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                      <TableCell className="px-4 py-3 text-start text-xs font-medium text-gray-800 dark:text-gray-200">
                        {log.date} ({log.day})
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-xs text-gray-500 dark:text-gray-400">
                        {log.hijriDate}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-xs font-semibold text-gray-900 dark:text-white">
                        {log.periodName}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start text-xs text-gray-600 dark:text-gray-300 flex items-center gap-1.5">
                        <ClockIcon className="size-3.5 text-gray-400" />
                        {log.checkInTime}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <Badge
                          color={
                            log.status === "Present"
                              ? "success"
                              : log.status === "Late"
                              ? "warning"
                              : log.status === "Leave"
                              ? "info"
                              : "error"
                          }
                          size="sm"
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {/* Tab 3: Interactive Attendance Simulator */}
        {activeTab === "simulator" && (
          <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
            <h3 className="text-base font-bold text-gray-900 dark:text-white">
              Target Attendance & Examination Eligibility Simulator
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Calculate projected attendance percentage by estimating attendance in upcoming classes.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50/60 p-4 dark:border-gray-800 dark:bg-gray-800/40">
                <div>
                  <label htmlFor="sim-classes" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Next Classes Attended (Consecutive 100% attendance):
                  </label>
                  <div className="mt-2 flex items-center gap-3">
                    <input
                      id="sim-classes"
                      type="range"
                      min="1"
                      max="30"
                      value={simulatedClasses}
                      onChange={(e) => setSimulatedClasses(Number(e.target.value))}
                      className="w-full accent-brand-500"
                    />
                    <span className="rounded-lg bg-brand-500 px-3 py-1 text-xs font-bold text-white">
                      +{simulatedClasses} classes
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Current Attendance Record:</span>
                    <strong className="text-gray-900 dark:text-white">{totalPresents} / {totalClasses} ({overallPercent}%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Simulated Upcoming Classes:</span>
                    <strong className="text-brand-600 dark:text-brand-400">+{simulatedClasses} / +{simulatedClasses}</strong>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-gray-900 dark:border-gray-700 dark:text-white">
                    <span>Projected Record:</span>
                    <span>{simulatedPresents} / {simulatedTotal}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-center rounded-xl border border-brand-200 bg-brand-50/50 p-6 text-center dark:border-brand-500/20 dark:bg-brand-500/10">
                <span className="text-xs font-semibold text-brand-700 dark:text-brand-300">
                  Projected Attendance Percentage
                </span>
                <p className="mt-2 text-4xl font-extrabold text-brand-600 dark:text-brand-400">
                  {simulatedPercent}%
                </p>
                <div className="mt-3">
                  <Badge color={simulatedPercent >= 75 ? "success" : "warning"} size="sm">
                    {simulatedPercent >= 75 ? "✓ Examination Qualified" : "⚠ Below 75% Threshold"}
                  </Badge>
                </div>
                <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
                  {simulatedPercent >= 75
                    ? "Your projected attendance meets the Wifaq-ul-Madaris criteria to sit in final exams."
                    : "You need to attend more classes to reach the mandatory 75% threshold."}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Madrassa Attendance Policy Notice */}
        <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-4.5 text-xs text-gray-700 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-gray-300 flex items-start gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-brand-500 text-white">
            <CheckCircleIcon className="size-4" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              Madrassa Uloom-e-Islamia Attendance Regulations
            </h4>
            <p className="mt-0.5 leading-relaxed">
              1. A minimum of <strong>75% presence</strong> in each kitab is strictly required to qualify for Wifaq-ul-Madaris Annual and Quarterly Examinations.<br />
              2. As per institutional rules, <strong>3 consecutive tardies / late arrivals</strong> are automatically converted into <strong>1 unexcused absence</strong> on the official attendance gazette.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
