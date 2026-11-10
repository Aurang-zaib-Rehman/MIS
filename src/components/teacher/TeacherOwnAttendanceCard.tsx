import {
  TEACHER_OWN_ATTENDANCE_LOG,
} from "@/services/teacherData";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { CheckCircleIcon, ClockIcon } from "@/icons";

export default function TeacherOwnAttendanceCard() {
  const totalDays = TEACHER_OWN_ATTENDANCE_LOG.length;
  const presentDays = TEACHER_OWN_ATTENDANCE_LOG.filter(
    (a) => a.status === "Present"
  ).length;
  const lateDays = TEACHER_OWN_ATTENDANCE_LOG.filter(
    (a) => a.status === "Late"
  ).length;
  const dutyDays = TEACHER_OWN_ATTENDANCE_LOG.filter(
    (a) => a.status === "On Duty"
  ).length;
  const punctualityRate = ((presentDays / (totalDays - dutyDays)) * 100).toFixed(1);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-success-50 text-success-600 shadow-xs dark:bg-success-500/15 dark:text-success-400">
            <CheckCircleIcon className="size-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
              Faculty Daily Attendance Record
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Biometric check-in, check-out, working hours, and monthly attendance log.
            </p>
          </div>
        </div>

        <Badge color="success" size="sm">
          Active Duty &bull; Punctuality {punctualityRate}%
        </Badge>
      </div>

      {/* KPI Stats */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
          <span className="text-xs text-gray-500 dark:text-gray-400">Total Recorded:</span>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            {totalDays} Days
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-success-50/40 p-3.5 dark:border-gray-800 dark:bg-success-500/10">
          <span className="text-xs text-success-700 dark:text-success-400">Present:</span>
          <p className="mt-1 text-lg font-bold text-success-700 dark:text-success-300">
            {presentDays} Days
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-warning-50/40 p-3.5 dark:border-gray-800 dark:bg-warning-500/10">
          <span className="text-xs text-warning-700 dark:text-warning-400">Late:</span>
          <p className="mt-1 text-lg font-bold text-warning-700 dark:text-warning-300">
            {lateDays} Day
          </p>
        </div>
        <div className="rounded-xl border border-gray-100 bg-brand-50/40 p-3.5 dark:border-gray-800 dark:bg-brand-500/10">
          <span className="text-xs text-brand-700 dark:text-brand-400">Special Duty / Shifts:</span>
          <p className="mt-1 text-lg font-bold text-brand-700 dark:text-brand-300">
            {dutyDays} Day
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <TableRow>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Date & Day
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Islamic Hijri Date
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-xs font-bold uppercase">
                  Check-In
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-xs font-bold uppercase">
                  Check-Out
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-xs font-bold uppercase">
                  Working Hours
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-xs font-bold uppercase">
                  Status
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Biometric Location
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {TEACHER_OWN_ATTENDANCE_LOG.map((record) => (
                <TableRow
                  key={record.id}
                  className="transition hover:bg-gray-50/50 dark:hover:bg-white/2"
                >
                  {/* Date & Day */}
                  <TableCell className="px-4 py-3">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      {record.date}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      {record.day}
                    </p>
                  </TableCell>

                  {/* Islamic Date */}
                  <TableCell className="px-4 py-3 text-xs font-medium text-gray-700 dark:text-gray-300">
                    {record.hijriDate}
                  </TableCell>

                  {/* Check In */}
                  <TableCell className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-800 dark:text-gray-200">
                      <ClockIcon className="size-3 text-brand-500" />
                      {record.checkIn}
                    </span>
                  </TableCell>

                  {/* Check Out */}
                  <TableCell className="px-4 py-3 text-center">
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-800 dark:text-gray-200">
                      <ClockIcon className="size-3 text-gray-400" />
                      {record.checkOut}
                    </span>
                  </TableCell>

                  {/* Working Hours */}
                  <TableCell className="px-4 py-3 text-center text-xs font-bold text-brand-600 dark:text-brand-400">
                    {record.workingHours}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3 text-center">
                    <Badge
                      color={
                        record.status === "Present"
                          ? "success"
                          : record.status === "Late"
                          ? "warning"
                          : record.status === "On Duty"
                          ? "primary"
                          : "error"
                      }
                      size="sm"
                    >
                      {record.status}
                    </Badge>
                  </TableCell>

                  {/* Location */}
                  <TableCell className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                    {record.location}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
