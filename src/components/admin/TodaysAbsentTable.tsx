import { useState } from "react";
import {
  TODAYS_ABSENT_STUDENTS,
  type AbsentStudentRecord,
} from "@/services/adminData";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { AlertIcon, ChevronDownIcon, ChevronUpIcon } from "@/icons";

export default function TodaysAbsentTable() {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedStudents: AbsentStudentRecord[] = isExpanded
    ? TODAYS_ABSENT_STUDENTS
    : TODAYS_ABSENT_STUDENTS.slice(0, 7);

  const getReasonBadgeColor = (reason: AbsentStudentRecord["reason"]) => {
    switch (reason) {
      case "Unexcused Absence":
        return "error";
      case "Medical Leave":
        return "warning";
      case "Family Emergency":
        return "primary";
      case "Hostel Sanctioned":
      default:
        return "info";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-400">
            <AlertIcon className="size-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
              Today's Absent Students
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Absence log flagging missed lectures, leave justifications, and guardian notification status.
            </p>
          </div>
        </div>

        <Badge color="error" size="sm">
          Absence Alerts: {TODAYS_ABSENT_STUDENTS.length} Unchecked
        </Badge>
      </div>

      {/* Absent Table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <TableRow>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Department
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Darja
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Student ID
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Student Name
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Class In Which Absent
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-xs font-bold uppercase">
                  Absence Reason
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Guardian Contact
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {displayedStudents.map((student) => (
                <TableRow
                  key={student.id}
                  className="transition hover:bg-gray-50/50 dark:hover:bg-white/2"
                >
                  {/* Department */}
                  <TableCell className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">
                    {student.department}
                  </TableCell>

                  {/* Darja */}
                  <TableCell className="px-4 py-3 text-xs font-medium text-gray-900 dark:text-white">
                    {student.darja}
                  </TableCell>

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

                  {/* Class In Which Student Absent */}
                  <TableCell className="px-4 py-3 text-xs font-semibold text-error-700 dark:text-error-400">
                    {student.classAbsent}
                  </TableCell>

                  {/* Absence Reason */}
                  <TableCell className="px-4 py-3 text-center">
                    <Badge color={getReasonBadgeColor(student.reason)} size="sm">
                      {student.reason}
                    </Badge>
                  </TableCell>

                  {/* Guardian Contact */}
                  <TableCell className="px-4 py-3 text-xs text-gray-600 dark:text-gray-300">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {student.fatherContact}
                    </span>
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
          <strong className="text-gray-800 dark:text-gray-200">{TODAYS_ABSENT_STUDENTS.length}</strong> absent records
        </span>

        {/* Right Bottom See More Action */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 self-end rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-bold text-error-700 transition hover:bg-error-50 hover:border-error-300 dark:border-gray-700 dark:bg-gray-800 dark:text-error-400 dark:hover:bg-error-500/15"
        >
          <span>{isExpanded ? "Show Less (7 Entries)" : `See More (${TODAYS_ABSENT_STUDENTS.length} Absentees)`}</span>
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

