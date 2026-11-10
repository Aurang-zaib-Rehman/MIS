import { useState } from "react";
import {
  STUDENT_WEEKLY_MATRIX,
  STUDENT_TIMETABLE,
  type MatrixPeriodItem,
  type TimetableSlot,
} from "@/services/studentData";
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
  EyeIcon,
} from "@/icons";
import Badge from "@/components/ui/badge/Badge";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import Button from "@/components/ui/button/Button";

type DayKey = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY" | "SATURDAY";

const DAYS_ROWS: { key: DayKey; label: string }[] = [
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

export default function StudentTimetableCard() {
  const [viewMode, setViewMode] = useState<"matrix" | "daily">("matrix");
  const [selectedDay, setSelectedDay] = useState<string>("Tuesday");
  const [selectedMatrixCell, setSelectedMatrixCell] = useState<{
    item: MatrixPeriodItem;
    periodLabel: string;
    day: string;
  } | null>(null);
  const [selectedDailySlot, setSelectedDailySlot] = useState<TimetableSlot | null>(null);

  const { isOpen, openModal, closeModal } = useModal();

  const handleOpenMatrixCell = (item: MatrixPeriodItem, periodLabel: string, day: string) => {
    setSelectedMatrixCell({ item, periodLabel, day });
    setSelectedDailySlot(null);
    openModal();
  };

  const handleOpenDailySlot = (slot: TimetableSlot) => {
    setSelectedDailySlot(slot);
    setSelectedMatrixCell(null);
    openModal();
  };

  const handlePrintTimetable = () => {
    window.print();
  };

  const daysList = Object.keys(STUDENT_TIMETABLE);
  const currentDailySlots: TimetableSlot[] = STUDENT_TIMETABLE[selectedDay] || [];

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
                Class TimeTable — Darja Saniya (Section A)
              </h2>
              <Badge color="primary" size="sm">
                Shift: 07:00 AM – 12:30 PM
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Department of Dars-e-Nizami &bull; Academic Session 1446-1447 AH &bull; 6 Days Schedule (Mon &ndash; Sat)
            </p>
          </div>
        </div>

        {/* Action Controls & Template View Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
          <div className="flex rounded-xl bg-gray-100 p-1 dark:bg-gray-800/80">
            <button
              type="button"
              onClick={() => setViewMode("matrix")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                viewMode === "matrix"
                  ? "bg-white text-brand-600 shadow-xs dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Weekly Grid
            </button>
            <button
              type="button"
              onClick={() => setViewMode("daily")}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                viewMode === "daily"
                  ? "bg-white text-brand-600 shadow-xs dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              Daily View
            </button>
          </div>

          <button
            type="button"
            onClick={handlePrintTimetable}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-brand-500/20"
          >
            <DownloadIcon className="size-3.5" />
            <span>Print Timetable</span>
          </button>
        </div>
      </div>

      {/* 2. Transposed Weekly Matrix Table: Days in 1st Column, Periods in 1st Row */}
      {viewMode === "matrix" ? (
        <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xs dark:border-gray-800 dark:bg-gray-900">
          <div className="max-w-full overflow-x-auto">
            <Table className="min-w-full">
              {/* 1st Row (Table Header): Periods across columns, clearly visible with template brand theme */}
              <TableHeader className="bg-brand-600 text-white dark:bg-brand-700">
                <TableRow className="border-b border-brand-700 dark:border-brand-800">
                  {/* Corner Anchor Cell */}
                  <TableCell
                    isHeader
                    className="w-36 min-w-32 border-r border-brand-500/40 bg-brand-700 px-4 py-3.5 text-center text-xs font-extrabold uppercase tracking-wider text-white shadow-2xs dark:bg-brand-800"
                  >
                    DAY \ PERIOD
                  </TableCell>

                  {/* 1st Row: Period Columns 1 through 7 */}
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

              {/* Table Body: Days are in the 1st Column */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {DAYS_ROWS.map((dayRow) => (
                  <TableRow
                    key={dayRow.key}
                    className="transition-colors hover:bg-gray-50/60 dark:hover:bg-white/2"
                  >
                    {/* 1st Column: Days prominently styled & clearly visible using template brand tokens */}
                    <TableCell className="w-36 min-w-32 border-r-2 border-brand-200 bg-brand-50/70 px-4 py-4 text-center dark:border-brand-500/30 dark:bg-brand-950/30">
                      <span className="block text-xs font-extrabold uppercase tracking-wider text-brand-900 dark:text-brand-200">
                        {dayRow.label}
                      </span>
                    </TableCell>

                    {/* Period Cells across this Day */}
                    {PERIOD_COLUMNS.map((period) => {
                      const matrixRow = STUDENT_WEEKLY_MATRIX.find(
                        (r) => r.periodNumber === period.number
                      );
                      const item: MatrixPeriodItem | undefined =
                        matrixRow?.days[dayRow.key];

                      if (!item) {
                        return (
                          <TableCell
                            key={period.number}
                            className="border-r border-gray-100 px-3 py-3 text-center text-xs text-gray-400 last:border-r-0 dark:border-gray-800"
                          >
                            -
                          </TableCell>
                        );
                      }

                      if (period.isBreak) {
                        return (
                          <TableCell
                            key={period.number}
                            onClick={() =>
                              handleOpenMatrixCell(
                                item,
                                period.label,
                                dayRow.label
                              )
                            }
                            className="cursor-pointer border-r border-gray-100 bg-amber-50/40 px-3.5 py-3 text-center transition-colors last:border-r-0 hover:bg-amber-100/50 dark:border-gray-800 dark:bg-amber-950/15 dark:hover:bg-amber-950/30"
                          >
                            <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-200">
                              {item.subject}
                            </span>
                          </TableCell>
                        );
                      }

                      return (
                        <TableCell
                          key={period.number}
                          onClick={() =>
                            handleOpenMatrixCell(
                              item,
                              period.label,
                              dayRow.label
                            )
                          }
                          className="group cursor-pointer border-r border-gray-100 px-3.5 py-3 text-center transition-colors last:border-r-0 hover:bg-brand-50/30 dark:border-gray-800 dark:hover:bg-brand-500/5"
                        >
                          {/* Subject Name */}
                          <p className="text-xs font-bold text-gray-900 transition-colors group-hover:text-brand-600 sm:text-[13px] dark:text-white dark:group-hover:text-brand-400">
                            {item.subject}
                          </p>

                          {/* Teacher Name */}
                          <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                            {item.teacher}
                          </p>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Table Bottom Footer Note */}
          <div className="flex flex-col gap-2 border-t border-gray-100 bg-gray-50/50 p-3.5 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800 dark:bg-gray-800/20 dark:text-gray-400">
            <span>
              💡 Click on any period cell to view curriculum details, classroom hall, and instructor consultation hours.
            </span>
            <span className="font-semibold text-brand-600 dark:text-brand-400">
              6 Days Weekly Timetable (Monday &ndash; Saturday)
            </span>
          </div>
        </div>
      ) : (
        /* 3. Daily View (Alternative Agenda Card Mode) */
        <div className="mt-5">
          {/* Day Selector Pills */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 pb-4 dark:border-gray-800">
            <div className="flex flex-wrap gap-1.5 rounded-xl bg-gray-100 p-1 dark:bg-gray-800/80">
              {daysList.map((day) => {
                const count = STUDENT_TIMETABLE[day]?.length || 0;
                const isSelected = selectedDay === day;

                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                      isSelected
                        ? "bg-white text-brand-600 shadow-xs dark:bg-gray-700 dark:text-white"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    }`}
                  >
                    <span>{day}</span>
                    <span
                      className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                        isSelected
                          ? "bg-brand-100 text-brand-700 dark:bg-brand-900/60 dark:text-brand-300"
                          : "bg-gray-200 text-gray-600 dark:bg-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <span className="text-xs text-gray-500 dark:text-gray-400">
              Viewing: <strong className="text-gray-800 dark:text-gray-200">{selectedDay}</strong> ({currentDailySlots.length} Periods)
            </span>
          </div>

          {/* Daily Period Cards */}
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {currentDailySlots.map((slot) => (
              <div
                key={slot.id}
                onClick={() => handleOpenDailySlot(slot)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleOpenDailySlot(slot);
                }}
                className={`group cursor-pointer flex flex-col justify-between rounded-xl border p-3.5 transition-all duration-200 hover:-translate-y-0.5 ${
                  slot.isNext
                    ? "border-brand-500 bg-brand-50/40 shadow-xs ring-1 ring-brand-500/20 dark:border-brand-500 dark:bg-brand-500/10"
                    : "border-gray-200 bg-gray-50/50 hover:border-brand-300 hover:bg-white hover:shadow-xs dark:border-gray-800 dark:bg-gray-800/40 dark:hover:border-brand-500/30 dark:hover:bg-gray-800"
                }`}
              >
                <div>
                  <div className="mb-2 flex items-center justify-between gap-1">
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-brand-600 dark:text-brand-400">
                      <ClockIcon className="size-3.5" />
                      {slot.startTime}
                    </span>
                    <Badge color={slot.isNext ? "primary" : "light"} size="sm">
                      Period {slot.periodNumber}
                    </Badge>
                  </div>

                  <h3 className="line-clamp-1 text-sm font-bold text-gray-900 transition-colors group-hover:text-brand-600 dark:text-white dark:group-hover:text-brand-400">
                    {slot.courseName}
                  </h3>
                  <p className="dir-rtl text-end font-arabic text-[11px] font-semibold text-gray-400 dark:text-gray-500">
                    {slot.arabicName}
                  </p>
                  <p className="text-[11px] font-medium text-brand-600 dark:text-brand-400">
                    {slot.courseCode}
                  </p>
                </div>

                <div className="mt-3 space-y-0.5 border-t border-gray-200/60 pt-2 text-start dark:border-gray-700/60">
                  <p className="truncate text-[11px] font-medium text-gray-800 dark:text-gray-200">
                    {slot.teacherName}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-gray-500 dark:text-gray-400">
                    <span className="truncate">{slot.room}</span>
                    <span className="inline-flex items-center gap-0.5 text-brand-600 group-hover:underline dark:text-brand-400">
                      <EyeIcon className="size-2.5" /> Details
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Interactive Period Details Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-md p-6">
        <div>
          {/* Header */}
          <div className="border-b border-gray-100 pb-3 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                {selectedMatrixCell ? `${selectedMatrixCell.periodLabel} • ${selectedMatrixCell.day}` : `Period ${selectedDailySlot?.periodNumber}`}
              </span>
              <span className="flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300">
                <ClockIcon className="size-3.5 text-brand-500" />
                {selectedMatrixCell ? selectedMatrixCell.item.time : `${selectedDailySlot?.startTime} – ${selectedDailySlot?.endTime}`}
              </span>
            </div>

            <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
              {selectedMatrixCell ? selectedMatrixCell.item.subject : selectedDailySlot?.courseName}
            </h3>
            <p className="font-arabic text-sm font-semibold text-gray-500 dark:text-gray-400">
              {selectedMatrixCell ? selectedMatrixCell.item.arabicName : selectedDailySlot?.arabicName}
            </p>
          </div>

          {/* Details */}
          <div className="mt-4 space-y-3 text-xs">
            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
              <span className="text-gray-500 dark:text-gray-400">Instructor / Ustadh:</span>
              <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">
                {selectedMatrixCell ? selectedMatrixCell.item.teacher : selectedDailySlot?.teacherName}
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                Shoba-e-Dars-e-Nizami &bull; Office: Asatidha Block A
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
                <span className="text-gray-500 dark:text-gray-400">Classroom:</span>
                <p className="mt-0.5 font-bold text-gray-900 dark:text-white">
                  {selectedMatrixCell ? selectedMatrixCell.item.room : selectedDailySlot?.room}
                </p>
              </div>
              <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
                <span className="text-gray-500 dark:text-gray-400">Weekly Schedule:</span>
                <p className="mt-0.5 font-bold text-gray-900 dark:text-white">
                  6 Days (Mon &ndash; Sat)
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <DocsIcon className="size-3.5 text-brand-500" />
                <span>Prescribed Curriculum & Textbook:</span>
              </div>
              <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                Standard Wifaq-ul-Madaris Al-Arabia curriculum edition
              </p>
            </div>
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
