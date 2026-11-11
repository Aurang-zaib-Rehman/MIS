import { useState } from "react";
import {
  TODAYS_PRESENT_STUDENTS,
  type PresentStudentRecord,
} from "@/services/adminData";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { CheckCircleIcon, ChevronDownIcon, ChevronUpIcon } from "@/icons";

export default function TodaysPresentTable() {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedStudents: PresentStudentRecord[] = isExpanded
    ? TODAYS_PRESENT_STUDENTS
    : TODAYS_PRESENT_STUDENTS.slice(0, 7);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
            <CheckCircleIcon className="size-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
              Today's Present Students
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Live biometric check-in log of students present in assigned classroom sessions.
            </p>
          </div>
        </div>

        <Badge color="success" size="sm">
          Active In Classes: {TODAYS_PRESENT_STUDENTS.length} Logged
        </Badge>
      </div>

      {/* Present Table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <TableRow>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Student ID
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Student Name
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Department
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Darja
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Class / Session
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-xs font-bold uppercase">
                  Check-In
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-xs font-bold uppercase">
                  Status
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {displayedStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className="transition hover:bg-gray-50/50 dark:hover:bg-white/2"
                >
                  {/* Student ID */}
                  <TableCell className="px-4 py-3 text-xs font-bold text-brand-600 dark:text-brand-400">
                    {student.studentId}
                  </TableCell>

                  {/* Student Name & Father */}
                  <TableCell className="px-4 py-3">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      {student.name}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      S/O: {student.fatherName}
                    </p>
                  </TableCell>

                  {/* Department */}
                  <TableCell className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">
                    {student.department}
                  </TableCell>

                  {/* Darja */}
                  <TableCell className="px-4 py-3 text-xs font-medium text-gray-900 dark:text-white">
                    {student.darja}
                  </TableCell>

                  {/* Class Attended */}
                  <TableCell className="px-4 py-3 text-xs text-gray-600 dark:text-gray-300">
                    {student.className}
                  </TableCell>

                  {/* Check In Time */}
                  <TableCell className="px-4 py-3 text-center text-xs font-semibold text-gray-800 dark:text-gray-200">
                    {student.checkInTime}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3 text-center">
                    <Badge color="success" size="sm">
                      {student.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Footer & Right Bottom "See More" Button */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Showing <strong className="text-gray-800 dark:text-gray-200">{displayedStudents.length}</strong> of{" "}
          <strong className="text-gray-800 dark:text-gray-200">{TODAYS_PRESENT_STUDENTS.length}</strong> present students
        </span>

        {/* Right Bottom See More Action */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 self-end rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-bold text-success-700 transition hover:bg-success-50 hover:border-success-300 dark:border-gray-700 dark:bg-gray-800 dark:text-success-400 dark:hover:bg-success-500/15"
        >
          <span>{isExpanded ? "Show Less (7 Entries)" : `See More (${TODAYS_PRESENT_STUDENTS.length} Students)`}</span>
          {isExpanded ? (
            <ChevronUpIcon className="size-4" />
          ) : (
            <ChevronDownIcon className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}

