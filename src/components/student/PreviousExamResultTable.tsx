import { useState } from "react";
import { PREVIOUS_EXAM_RESULTS, type PreviousExamResult } from "@/services/studentData";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { DownloadIcon, TaskIcon } from "@/icons";

export default function PreviousExamResultTable() {
  const [selectedExamIndex, setSelectedExamIndex] = useState<number>(0);
  const currentExam: PreviousExamResult = PREVIOUS_EXAM_RESULTS[selectedExamIndex] || PREVIOUS_EXAM_RESULTS[0];

  const handlePrintResult = () => {
    window.print();
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      {/* Header with Exam Selector */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-success-50 text-success-600 shadow-xs dark:bg-success-500/15 dark:text-success-400">
            <TaskIcon className="size-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
                Previous Examination Results & Gazette
              </h2>
              <Badge color="success" size="sm">
                {currentExam.positionInDarja}
              </Badge>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Verified Official Academic Records according to Wifaq-ul-Madaris Al-Arabia Standards
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-center">
          <div className="flex flex-wrap gap-1.5 rounded-xl bg-gray-100 p-1 dark:bg-gray-800/80">
            {PREVIOUS_EXAM_RESULTS.map((exam, idx) => (
              <button
                key={exam.term}
                type="button"
                onClick={() => setSelectedExamIndex(idx)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                  selectedExamIndex === idx
                    ? "bg-white text-brand-600 shadow-xs dark:bg-gray-700 dark:text-white"
                    : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                }`}
              >
                {exam.term}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handlePrintResult}
            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-brand-50 hover:text-brand-600 hover:border-brand-200 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-brand-500/20"
          >
            <DownloadIcon className="size-3.5" />
            <span>Print Gazette</span>
          </button>
        </div>
      </div>

      {/* Summary Stat Badges */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
          <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
            Academic Session
          </span>
          <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
            {currentExam.academicYear}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
          <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
            Total Obtained Marks
          </span>
          <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
            {currentExam.obtainedMarks} / {currentExam.totalMarks}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
          <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
            Aggregate Percentage
          </span>
          <p className="mt-1 text-sm font-bold text-brand-600 dark:text-brand-400">
            {currentExam.overallPercentage}%
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
          <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
            Wifaq Board Standing
          </span>
          <div className="mt-1">
            <Badge color="success" size="sm">
              {currentExam.wifaqStatus}
            </Badge>
          </div>
        </div>
      </div>

      {/* Results Table */}
      <div className="mt-5 max-w-full overflow-x-auto">
        <Table className="min-w-full">
          <TableHeader className="border-b border-gray-100 bg-gray-50/80 dark:border-gray-800 dark:bg-gray-800/50">
            <TableRow>
              <TableCell
                isHeader
                className="px-4 py-3 text-start text-theme-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Course ID
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 text-start text-theme-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Course / Kitab Name
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 text-start text-theme-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Total Marks
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 text-start text-theme-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Obtained Marks
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 text-start text-theme-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Percentage
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 text-start text-theme-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Grade
              </TableCell>
              <TableCell
                isHeader
                className="px-4 py-3 text-start text-theme-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400"
              >
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
            {currentExam.records.map((rec) => (
              <TableRow key={rec.courseId} className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                <TableCell className="px-4 py-3.5 text-start text-xs font-semibold text-brand-600 dark:text-brand-400">
                  {rec.courseId}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-start text-xs font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center justify-between gap-2">
                    <span>{rec.courseName}</span>
                    <span className="text-[11px] font-arabic font-semibold text-gray-400 dark:text-gray-500">
                      {rec.arabicName}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-start text-xs font-semibold text-gray-600 dark:text-gray-300">
                  {rec.totalMarks}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-start text-xs font-bold text-gray-900 dark:text-white">
                  {rec.obtainedMarks}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-start text-xs font-medium text-gray-700 dark:text-gray-300">
                  {rec.percentage}%
                </TableCell>
                <TableCell className="px-4 py-3.5 text-start text-xs font-semibold text-brand-700 dark:text-brand-300">
                  {rec.grade}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-start">
                  <Badge color={rec.status === "Pass" ? "success" : "error"} size="sm">
                    {rec.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Passing Rules Footnote */}
      <div className="mt-4 rounded-xl border border-brand-200 bg-brand-50/60 p-3 text-start text-xs text-brand-800 dark:border-brand-500/20 dark:bg-brand-500/10 dark:text-brand-300">
        <strong className="font-semibold">Wifaq-ul-Madaris Al-Arabia Passing Criteria:</strong> Minimum 240 marks aggregate across 6 subjects required for promotion. Failing 1 paper allows conditional promotion with clearance. Failing 2 or more papers requires repeating the academic Darja.
      </div>
    </div>
  );
}
