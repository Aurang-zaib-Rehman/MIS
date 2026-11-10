import { useState } from "react";
import {
  TEACHER_WEEKLY_MATRIX,
  type TeacherTimetableCell,
  type TeacherDayKey,
} from "@/services/teacherData";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CalenderIcon,
  ClockIcon,
  DownloadIcon,
  DocsIcon,
  UserIcon,
} from "@/icons";
import Badge from "@/components/ui/badge/Badge";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/button/Button";

const DAYS_ROWS: { key: TeacherDayKey; label: string }[] = [
  { key: "MONDAY", label: "MONDAY" },
  { key: "TUESDAY", label: "TUESDAY" },
  { key: "WEDNESDAY", label: "WEDNESDAY" },
  { key: "THURSDAY", label: "THURSDAY" },
  { key: "FRIDAY", label: "FRIDAY" },
  { key: "SATURDAY", label: "SATURDAY" },
];

const PERIOD_COLUMNS = [
  { number: 1, label: "Period 1", time: "07:00 – 07:45", isBreak: false },
  { number: 2, label: "Period 2", time: "07:45 – 08:30", isBreak: false },
  { number: 3, label: "Period 3", time: "08:30 – 09:15", isBreak: false },
  { number: 4, label: "Period 4", time: "09:15 – 10:00", isBreak: false },
  { number: 5, label: "Period 5", time: "10:00 – 11:00", isBreak: true },
  { number: 6, label: "Period 6", time: "11:00 – 11:45", isBreak: false },
  { number: 7, label: "Period 7", time: "11:45 – 12:30", isBreak: false },
];

export default function TeacherTimetableCard() {
  const [selectedCell, setSelectedCell] = useState<{
    cell: TeacherTimetableCell;
    periodLabel: string;
    periodTime: string;
    day: string;
  } | null>(null);

  const { isOpen, openModal, closeModal } = useModal();

  const handleOpenCell = (
    cell: TeacherTimetableCell,
    periodLabel: string,
    periodTime: string,
    day: string
  ) => {
    setSelectedCell({ cell, periodLabel, periodTime, day });
    openModal();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      {/* 1. Standard Template Card Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-xs dark:bg-brand-500/15 dark:text-brand-400">
            <CalenderIcon className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
                Teacher TimeTable & Lecture Schedule
              </h2>
              <Badge color="primary" size="sm">
                Shift: 07:00 AM – 12:30 PM
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Maulana Aurang Zaib Rehman &bull; Shoba-e-Dars-e-Nizami &bull; 6 Days Schedule (Mon &ndash; Sat)
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-brand-500/20"
          >
            <DownloadIcon className="size-3.5" />
            <span>Print Timetable</span>
          </button>
        </div>
      </div>

      {/* 2. Transposed Weekly Matrix Table: Days in 1st Column, Periods in 1st Row */}
      <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xs dark:border-gray-800 dark:bg-gray-900">
        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-full">
            {/* 1st Row: Period Header */}
            <TableHeader className="bg-brand-600 text-white dark:bg-brand-700">
              <TableRow className="border-b border-brand-700 dark:border-brand-800">
                {/* Corner Anchor Cell */}
                <TableCell
                  isHeader
                  className="w-36 min-w-32 border-r border-brand-500/40 bg-brand-700 px-4 py-3.5 text-center text-xs font-extrabold uppercase tracking-wider text-white shadow-2xs dark:bg-brand-800"
                >
                  DAY \ PERIOD
                </TableCell>

                {/* 1st Row: Periods 1 to 7 */}
                {PERIOD_COLUMNS.map((period) => (
                  <TableCell
                    key={period.number}
                    isHeader
                    className={`min-w-36 border-r border-brand-500/30 px-3.5 py-3 text-center uppercase tracking-wider last:border-r-0 ${
                      period.isBreak
                        ? "bg-amber-600/90 font-extrabold text-white dark:bg-amber-700"
                        : "font-bold text-white"
                    }`}
                  >
                    <span className="block text-xs font-bold text-white">
                      {period.label} {period.isBreak ? "(LUNCH)" : ""}
                    </span>
                    <span
                      className={`mt-0.5 block text-[10px] font-medium ${
                        period.isBreak ? "text-amber-100" : "text-brand-100"
                      }`}
                    >
                      {period.time}
                    </span>
                  </TableCell>
                ))}
              </TableRow>
            </TableHeader>

            {/* Table Body: Days in 1st Column */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {DAYS_ROWS.map((dayRow) => (
                <TableRow
                  key={dayRow.key}
                  className="transition-colors hover:bg-gray-50/60 dark:hover:bg-white/2"
                >
                  {/* 1st Column: Days */}
                  <TableCell className="w-36 min-w-32 border-r-2 border-brand-200 bg-brand-50/70 px-4 py-4 text-center dark:border-brand-500/30 dark:bg-brand-950/30">
                    <span className="block text-xs font-extrabold uppercase tracking-wider text-brand-900 dark:text-brand-200">
                      {dayRow.label}
                    </span>
                  </TableCell>

                  {/* Period Cells */}
                  {PERIOD_COLUMNS.map((period) => {
                    const matrixRow = TEACHER_WEEKLY_MATRIX.find(
                      (r) => r.periodNumber === period.number
                    );
                    const cell: TeacherTimetableCell | undefined =
                      matrixRow?.days[dayRow.key];

                    if (!cell) {
                      return (
                        <TableCell
                          key={period.number}
                          className="border-r border-gray-100 px-3 py-3 text-center text-xs text-gray-400 last:border-r-0 dark:border-gray-800"
                        >
                          -
                        </TableCell>
                      );
                    }

                    // 1. Break / Lunch Period
                    if (period.isBreak || cell.isBreak) {
                      return (
                        <TableCell
                          key={period.number}
                          onClick={() =>
                            handleOpenCell(
                              cell,
                              period.label,
                              period.time,
                              dayRow.label
                            )
                          }
                          className="cursor-pointer border-r border-gray-100 bg-amber-50/40 px-3.5 py-3 text-center transition-colors last:border-r-0 hover:bg-amber-100/50 dark:border-gray-800 dark:bg-amber-950/15 dark:hover:bg-amber-950/30"
                        >
                          <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                            {cell.freeTitle || "LUNCH RECESS"}
                          </span>
                        </TableCell>
                      );
                    }

                    // 2. Free Period / Office Hour
                    if (cell.isFree) {
                      return (
                        <TableCell
                          key={period.number}
                          onClick={() =>
                            handleOpenCell(
                              cell,
                              period.label,
                              period.time,
                              dayRow.label
                            )
                          }
                          className="group cursor-pointer border-r border-gray-100 bg-gray-50/60 px-3 py-3 text-center transition-colors last:border-r-0 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-800/25 dark:hover:bg-gray-800/50"
                        >
                          <span className="inline-block rounded-md bg-gray-200/70 px-2 py-0.5 text-[11px] font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                            Free Period
                          </span>
                          <p className="mt-1 line-clamp-1 text-[11px] font-medium text-gray-500 dark:text-gray-400">
                            {cell.freeTitle?.replace("Free Period / ", "") || "Preparation"}
                          </p>
                        </TableCell>
                      );
                    }

                    // 3. Regular Teaching Period
                    return (
                      <TableCell
                        key={period.number}
                        onClick={() =>
                          handleOpenCell(
                            cell,
                            period.label,
                            period.time,
                            dayRow.label
                          )
                        }
                        className="group cursor-pointer border-r border-gray-100 px-3.5 py-3 text-center transition-colors last:border-r-0 hover:bg-brand-50/30 dark:border-gray-800 dark:hover:bg-brand-500/5"
                      >
                        {/* Course Name */}
                        <p className="text-xs font-bold text-gray-900 transition-colors group-hover:text-brand-600 sm:text-[13px] dark:text-white dark:group-hover:text-brand-400">
                          {cell.subject}
                        </p>

                        {/* Assigned Darja / Class */}
                        <p className="mt-0.5 truncate text-xs font-medium text-brand-600 dark:text-brand-400">
                          {cell.darja}
                        </p>

                        {/* Room Location */}
                        <p className="mt-0.5 truncate text-[11px] text-gray-500 dark:text-gray-400">
                          {cell.room}
                        </p>
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer Notes */}
        <div className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50/50 p-3.5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-gray-800/20 dark:text-gray-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-brand-500" />
              <span>Teaching Periods (Active Class)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="size-2.5 rounded-full bg-gray-400" />
              <span>Free Periods (Lesson Prep & Counseling)</span>
            </span>
          </div>
          <span className="font-semibold text-brand-600 dark:text-brand-400">
            Click on any cell for lesson syllabus & classroom details
          </span>
        </div>
      </div>

      {/* 3. Interactive Lecture / Free Period Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-md p-6">
        <div>
          {/* Header */}
          <div className="border-b border-gray-100 pb-3 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span
                className={`rounded-md px-2 py-0.5 text-xs font-bold ${
                  selectedCell?.cell.isFree
                    ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    : "bg-brand-50 text-brand-700 dark:bg-brand-900/40 dark:text-brand-300"
                }`}
              >
                {selectedCell?.periodLabel} &bull; {selectedCell?.day}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
                <ClockIcon className="size-3.5 text-brand-500" />
                {selectedCell?.periodTime}
              </span>
            </div>

            <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
              {selectedCell?.cell.isFree
                ? selectedCell.cell.freeTitle || "Free Period"
                : selectedCell?.cell.subject}
            </h3>
            {selectedCell?.cell.arabicName && (
              <p className="font-arabic text-sm font-semibold text-gray-500 dark:text-gray-400">
                {selectedCell.cell.arabicName}
              </p>
            )}
          </div>

          {/* Details */}
          <div className="mt-4 space-y-3 text-xs">
            {!selectedCell?.cell.isFree ? (
              <>
                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
                  <span className="text-gray-500 dark:text-gray-400">Assigned Class / Darja:</span>
                  <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">
                    {selectedCell?.cell.darja}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400">
                    Department of Dars-e-Nizami &bull; Room: {selectedCell?.cell.room}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
                    <span className="text-gray-500 dark:text-gray-400">Enrolled Students:</span>
                    <p className="mt-0.5 flex items-center gap-1 font-bold text-gray-900 dark:text-white">
                      <UserIcon className="size-3.5 text-brand-500" />
                      {selectedCell?.cell.studentCount} Students
                    </p>
                  </div>
                  <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
                    <span className="text-gray-500 dark:text-gray-400">Schedule:</span>
                    <p className="mt-0.5 font-bold text-gray-900 dark:text-white">
                      Weekly (6 Days)
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
                  <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                    <DocsIcon className="size-3.5 text-brand-500" />
                    <span>Prescribed Dars / Lesson Topic:</span>
                  </div>
                  <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                    {selectedCell?.cell.topic || "Standard Syllabus Lesson"}
                  </p>
                </div>
              </>
            ) : (
              <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4 text-center dark:border-gray-800 dark:bg-gray-800/40">
                <span className="inline-block rounded-full bg-gray-200/80 px-3 py-1 text-xs font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-200">
                  Non-Teaching Slot / Preparation
                </span>
                <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">
                  {selectedCell?.cell.notes || "Designated for lecture preparation, student consultation, and Darja record keeping."}
                </p>
                <p className="mt-1 text-[11px] text-gray-400 dark:text-gray-500">
                  Location: {selectedCell?.cell.room || "Asatidha Staff Block"}
                </p>
              </div>
            )}
          </div>

          <div className="mt-5 flex justify-end">
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

