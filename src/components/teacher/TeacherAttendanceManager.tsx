import { useState } from "react";
import {
  INITIAL_STUDENT_ROSTER,
  type StudentAttendanceEntry,
} from "@/services/teacherData";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import { CheckCircleIcon, CalenderIcon, ClockIcon } from "@/icons";

export default function TeacherAttendanceManager() {
  // Filter States
  const [selectedDate, setSelectedDate] = useState("2026-11-10");
  const [selectedPeriod, setSelectedPeriod] = useState("Period 1: Ilm-us-Sarf (07:00 – 07:45 AM)");
  const [selectedDepartment, setSelectedDepartment] = useState("Department of Dars-e-Nizami");
  const [selectedDarja, setSelectedDarja] = useState("Darja Saniya (Year 2)");
  const [selectedSection, setSelectedSection] = useState("Section A");

  // Roster & Attendance State
  const [roster, setRoster] = useState<StudentAttendanceEntry[]>(INITIAL_STUDENT_ROSTER);
  const [isSaved, setIsSaved] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Status Change Handler
  const handleStatusChange = (
    id: string,
    newStatus: "Present" | "Absent" | "Late" | "Leave"
  ) => {
    setRoster((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, status: newStatus } : student
      )
    );
    setIsSaved(false);
  };

  // Remarks Change Handler
  const handleRemarksChange = (id: string, newRemarks: string) => {
    setRoster((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, remarks: newRemarks } : student
      )
    );
    setIsSaved(false);
  };

  // Bulk Actions
  const handleMarkAllPresent = () => {
    setRoster((prev) =>
      prev.map((student) => ({ ...student, status: "Present" }))
    );
    setIsSaved(false);
  };

  const handleClearAll = () => {
    setRoster((prev) =>
      prev.map((student) => ({ ...student, status: "Absent" }))
    );
    setIsSaved(false);
  };

  // Save Handler
  const handleSaveAttendance = () => {
    const timeString = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setLastSavedTime(timeString);
    setIsSaved(true);
  };

  // Stats
  const totalStudents = roster.length;
  const presentCount = roster.filter((s) => s.status === "Present").length;
  const absentCount = roster.filter((s) => s.status === "Absent").length;
  const lateCount = roster.filter((s) => s.status === "Late").length;
  const leaveCount = roster.filter((s) => s.status === "Leave").length;
  const attendanceRate = totalStudents > 0 ? ((presentCount / totalStudents) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      {/* 1. Top Filters Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-3.5 dark:border-gray-800">
          <div>
            <h2 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
              Student Attendance Management
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Select class, period, and section to mark or review daily student attendance.
            </p>
          </div>
          <Badge color="primary" size="sm">
            Ustadh: Maulana Aurang Zaib Rehman
          </Badge>
        </div>

        {/* 5 Filter Selectors */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Filter 1: Date */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <CalenderIcon className="size-3.5 text-brand-500" />
              <span>Select Date</span>
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setIsSaved(false);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 shadow-2xs outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            />
          </div>

          {/* Filter 2: Time / Period */}
          <div>
            <label className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300">
              <ClockIcon className="size-3.5 text-brand-500" />
              <span>Select Period / Time</span>
            </label>
            <select
              value={selectedPeriod}
              onChange={(e) => {
                setSelectedPeriod(e.target.value);
                setIsSaved(false);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 shadow-2xs outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="Period 1: Ilm-us-Sarf (07:00 – 07:45 AM)">Period 1: Ilm-us-Sarf (07:00 – 07:45 AM)</option>
              <option value="Period 3: Nahw Mir (08:30 – 09:15 AM)">Period 3: Nahw Mir (08:30 – 09:15 AM)</option>
              <option value="Period 4: Noor-ul-Idhah (09:15 – 10:00 AM)">Period 4: Noor-ul-Idhah (09:15 – 10:00 AM)</option>
              <option value="Period 6: Al-Qiraat (11:00 – 11:45 AM)">Period 6: Al-Qiraat (11:00 – 11:45 AM)</option>
            </select>
          </div>

          {/* Filter 3: Department */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Department
            </label>
            <select
              value={selectedDepartment}
              onChange={(e) => {
                setSelectedDepartment(e.target.value);
                setIsSaved(false);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 shadow-2xs outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="Department of Dars-e-Nizami">Shoba-e-Dars-e-Nizami</option>
              <option value="Department of Hifz-ul-Quran">Shoba-e-Hifz-ul-Quran</option>
              <option value="Department of Tajweed">Shoba-e-Tajweed & Qiraat</option>
            </select>
          </div>

          {/* Filter 4: Class / Darja */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Class / Darja
            </label>
            <select
              value={selectedDarja}
              onChange={(e) => {
                setSelectedDarja(e.target.value);
                setIsSaved(false);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 shadow-2xs outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="Darja Saniya (Year 2)">Darja Saniya (Year 2)</option>
              <option value="Darja Oola (Year 1)">Darja Oola (Year 1)</option>
              <option value="Darja Thalitha (Year 3)">Darja Thalitha (Year 3)</option>
            </select>
          </div>

          {/* Filter 5: Section */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Section
            </label>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setIsSaved(false);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 shadow-2xs outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="Section A">Section A</option>
              <option value="Section B">Section B</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Roster Table & Marking Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
        {/* Subheader & Stats Bar */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
          <div>
            <h3 className="text-sm font-bold text-gray-900 sm:text-base dark:text-white">
              Class Roster &bull; {selectedDarja} &ndash; {selectedSection}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Date: <strong className="text-gray-700 dark:text-gray-300">{selectedDate}</strong> &bull; {selectedPeriod}
            </p>
          </div>

          {/* Bulk Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm" variant="outline" onClick={handleMarkAllPresent}>
              Mark All Present
            </Button>
            <Button size="sm" variant="outline" onClick={handleClearAll}>
              Clear All
            </Button>
            <Button size="sm" onClick={handleSaveAttendance}>
              Save Attendance
            </Button>
          </div>
        </div>

        {/* Attendance Summary Stat Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            Total Enrolled: {totalStudents}
          </span>
          <span className="rounded-lg bg-success-50 px-3 py-1.5 text-xs font-bold text-success-700 dark:bg-success-500/15 dark:text-success-400">
            Present: {presentCount}
          </span>
          <span className="rounded-lg bg-error-50 px-3 py-1.5 text-xs font-bold text-error-700 dark:bg-error-500/15 dark:text-error-400">
            Absent: {absentCount}
          </span>
          <span className="rounded-lg bg-warning-50 px-3 py-1.5 text-xs font-bold text-warning-700 dark:bg-warning-500/15 dark:text-warning-400">
            Late: {lateCount}
          </span>
          <span className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
            Leave: {leaveCount}
          </span>
          <span className="ms-auto rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-bold text-white dark:bg-brand-700">
            Attendance Rate: {attendanceRate}%
          </span>
        </div>

        {/* Save Confirmation Banner */}
        {isSaved && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-success-200 bg-success-50/70 p-3 text-xs text-success-800 dark:border-success-500/30 dark:bg-success-500/10 dark:text-success-300">
            <span className="flex items-center gap-2 font-semibold">
              <CheckCircleIcon className="size-4 text-success-600 dark:text-success-400" />
              Attendance successfully recorded and saved for {selectedDarja} ({selectedSection})!
            </span>
            <span>Recorded at {lastSavedTime}</span>
          </div>
        )}

        {/* Student Table */}
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
          <div className="max-w-full overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                <TableRow>
                  <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                    Roll No
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                    Student Name
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                    Father's Name
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3 text-center text-xs font-bold uppercase">
                    Attendance Status
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                    Teacher Remarks
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {roster.map((student) => (
                  <TableRow
                    key={student.id}
                    className="transition hover:bg-gray-50/50 dark:hover:bg-white/2"
                  >
                    {/* Roll No */}
                    <TableCell className="px-4 py-3 text-xs font-bold text-gray-900 dark:text-white">
                      {student.rollNo}
                    </TableCell>

                    {/* Student Name */}
                    <TableCell className="px-4 py-3">
                      <p className="text-xs font-bold text-gray-900 dark:text-white">
                        {student.studentName}
                      </p>
                      <p className="text-[10px] text-gray-400 dark:text-gray-500">
                        {student.registrationNo}
                      </p>
                    </TableCell>

                    {/* Father Name */}
                    <TableCell className="px-4 py-3 text-xs text-gray-600 dark:text-gray-300">
                      {student.fatherName}
                    </TableCell>

                    {/* Status Toggle Buttons */}
                    <TableCell className="px-4 py-3 text-center">
                      <div className="inline-flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
                        {/* Present Button */}
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, "Present")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                            student.status === "Present"
                              ? "bg-success-600 text-white shadow-2xs"
                              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          }`}
                        >
                          Present
                        </button>

                        {/* Absent Button */}
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, "Absent")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                            student.status === "Absent"
                              ? "bg-error-600 text-white shadow-2xs"
                              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          }`}
                        >
                          Absent
                        </button>

                        {/* Late Button */}
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, "Late")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                            student.status === "Late"
                              ? "bg-warning-500 text-white shadow-2xs"
                              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          }`}
                        >
                          Late
                        </button>

                        {/* Leave Button */}
                        <button
                          type="button"
                          onClick={() => handleStatusChange(student.id, "Leave")}
                          className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${
                            student.status === "Leave"
                              ? "bg-brand-600 text-white shadow-2xs"
                              : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          }`}
                        >
                          Leave
                        </button>
                      </div>
                    </TableCell>

                    {/* Remarks Input */}
                    <TableCell className="px-4 py-3">
                      <input
                        type="text"
                        value={student.remarks || ""}
                        onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                        placeholder="Add remarks..."
                        className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-800 shadow-2xs outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Bottom Save Action Bar */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Attendance is synced to central Madrassa records upon clicking Save.
          </p>
          <Button size="sm" onClick={handleSaveAttendance}>
            Save & Finalize Attendance
          </Button>
        </div>
      </div>
    </div>
  );
}

