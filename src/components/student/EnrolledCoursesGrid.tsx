import { useState } from "react";
import { ENROLLED_COURSES, type EnrolledCourseSummary } from "@/services/studentData";
import Badge from "@/components/ui/badge/Badge";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { CheckCircleIcon, DocsIcon, EyeIcon } from "@/icons";

export default function EnrolledCoursesGrid() {
  const [selectedCourse, setSelectedCourse] = useState<EnrolledCourseSummary | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStanding, setFilterStanding] = useState<"ALL" | "MUMTAZ" | "JAYYID">("ALL");
  const { isOpen, openModal, closeModal } = useModal();

  const handleOpenCourseModal = (course: EnrolledCourseSummary) => {
    setSelectedCourse(course);
    openModal();
  };

  const filteredCourses = ENROLLED_COURSES.filter((course) => {
    const matchesSearch =
      course.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.courseCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.teacherName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.arabicTitle.includes(searchQuery);

    if (!matchesSearch) return false;

    if (filterStanding === "MUMTAZ") {
      return course.status === "Mumtaz";
    }
    if (filterStanding === "JAYYID") {
      return course.status === "Jayyid Jiddan" || course.status === "Jayyid";
    }
    return true;
  });

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-blue-light-50 text-blue-light-600 shadow-xs dark:bg-blue-light-500/15 dark:text-blue-light-400">
            <DocsIcon className="size-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
              Enrolled Courses & Academic Standing
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Sessional Performance, Syllabus Milestones & Course Attendance
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Standing filter buttons */}
          <div className="flex gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800/80">
            <button
              type="button"
              onClick={() => setFilterStanding("ALL")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                filterStanding === "ALL"
                  ? "bg-white text-brand-600 shadow-xs dark:bg-gray-700 dark:text-white"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
              }`}
            >
              All ({ENROLLED_COURSES.length})
            </button>
            <button
              type="button"
              onClick={() => setFilterStanding("MUMTAZ")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                filterStanding === "MUMTAZ"
                  ? "bg-white text-emerald-600 shadow-xs dark:bg-gray-700 dark:text-emerald-400"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
              }`}
            >
              Mumtaz (&ge;85%)
            </button>
            <button
              type="button"
              onClick={() => setFilterStanding("JAYYID")}
              className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${
                filterStanding === "JAYYID"
                  ? "bg-white text-brand-600 shadow-xs dark:bg-gray-700 dark:text-brand-300"
                  : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
              }`}
            >
              Jayyid
            </button>
          </div>

          {/* Quick Search */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Kitab or Ustadh..."
            className="w-44 rounded-xl border border-gray-200 px-3 py-1.5 text-xs text-gray-800 focus:border-brand-500 focus:outline-hidden dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>

      {/* Courses Cards Grid */}
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => {
          const isGoodAttendance = course.attendancePercent >= 75;
          const marksPercent = Math.round((course.currentMarks / course.totalMarks) * 100);

          return (
            <div
              key={course.courseCode}
              onClick={() => handleOpenCourseModal(course)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleOpenCourseModal(course);
                }
              }}
              className="group cursor-pointer flex flex-col justify-between rounded-xl border border-gray-200 bg-white p-4.5 shadow-xs transition-all duration-200 hover:border-brand-400 hover:shadow-md hover:-translate-y-0.5 dark:border-gray-800 dark:bg-gray-800/60 dark:hover:border-brand-500/40"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <span className="rounded-md bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                    {course.courseCode}
                  </span>
                  <Badge
                    color={
                      course.status === "Mumtaz"
                        ? "success"
                        : course.status === "Jayyid Jiddan"
                        ? "info"
                        : "warning"
                    }
                    size="sm"
                  >
                    {course.status}
                  </Badge>
                </div>

                <div className="mt-2 flex items-baseline justify-between">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-brand-600 transition-colors dark:text-white dark:group-hover:text-brand-400">
                    {course.courseName}
                  </h3>
                </div>
                <p className="text-[11px] font-arabic font-semibold text-gray-400 dark:text-gray-500">
                  {course.arabicTitle}
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Ustadh: <strong className="text-gray-700 dark:text-gray-300">{course.teacherName}</strong>
                </p>
              </div>

              <div className="mt-4 space-y-3 border-t border-gray-100 pt-3 dark:border-gray-700/60">
                {/* Sessional Marks Progress */}
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-600 dark:text-gray-300">
                      Sessional Score
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {course.currentMarks}/{course.totalMarks} ({marksPercent}%)
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                    <div
                      className="h-full rounded-full bg-brand-500 transition-all duration-300"
                      style={{ width: `${marksPercent}%` }}
                    />
                  </div>
                </div>

                {/* Attendance Presence Progress */}
                <div>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1 font-medium text-gray-600 dark:text-gray-300">
                      <CheckCircleIcon className="size-3 text-success-500" />
                      Attendance Presence
                    </span>
                    <span
                      className={`font-bold ${
                        isGoodAttendance
                          ? "text-success-600 dark:text-success-400"
                          : "text-warning-600 dark:text-warning-400"
                      }`}
                    >
                      {course.attendancePercent}%
                    </span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-700">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isGoodAttendance ? "bg-success-500" : "bg-warning-500"
                      }`}
                      style={{ width: `${course.attendancePercent}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1 text-[11px] text-gray-500 dark:text-gray-400">
                  <span>{course.weeklyPeriods} Periods/Week</span>
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-600 group-hover:underline dark:text-brand-400">
                    <EyeIcon className="size-3" /> View Kitab Details
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredCourses.length === 0 && (
        <div className="mt-6 rounded-xl border border-dashed border-gray-200 p-8 text-center text-xs text-gray-500 dark:border-gray-700">
          No courses matched your search criteria.
        </div>
      )}

      {/* Course Details Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-xl p-6">
        {selectedCourse && (
          <div>
            <div className="border-b border-gray-100 pb-3 dark:border-gray-800">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-900/30 dark:text-brand-300">
                  {selectedCourse.courseCode}
                </span>
                <Badge color="success" size="sm">
                  {selectedCourse.status}
                </Badge>
              </div>
              <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
                {selectedCourse.courseName}
              </h3>
              <p className="text-sm font-arabic font-semibold text-gray-500 dark:text-gray-400">
                {selectedCourse.arabicTitle}
              </p>
            </div>

            <div className="mt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
                  <span className="text-gray-500 dark:text-gray-400">Instructor:</span>
                  <p className="mt-0.5 font-bold text-gray-900 dark:text-white">
                    {selectedCourse.teacherName}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
                  <span className="text-gray-500 dark:text-gray-400">Academic Darja:</span>
                  <p className="mt-0.5 font-bold text-gray-900 dark:text-white">
                    {selectedCourse.darja}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
                <span className="text-gray-500 dark:text-gray-400">Prescribed Textbook & Edition:</span>
                <p className="mt-0.5 font-semibold text-gray-900 dark:text-white">
                  {selectedCourse.textbook}
                </p>
              </div>

              <div>
                <div className="mb-1 flex justify-between font-semibold text-gray-700 dark:text-gray-300">
                  <span>Syllabus Covered</span>
                  <span>
                    {selectedCourse.chaptersCompleted} of {selectedCourse.totalChapters} Chapters ({selectedCourse.syllabusProgress}%)
                  </span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-gray-100 dark:bg-gray-700 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-brand-500"
                    style={{ width: `${selectedCourse.syllabusProgress}%` }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="rounded-xl bg-brand-50/60 p-3 text-center dark:bg-brand-500/10">
                  <span className="text-[11px] text-brand-700 dark:text-brand-300 font-medium">
                    Sessional Marks
                  </span>
                  <p className="mt-0.5 text-base font-bold text-brand-800 dark:text-brand-200">
                    {selectedCourse.currentMarks} / {selectedCourse.totalMarks}
                  </p>
                </div>

                <div className="rounded-xl bg-emerald-50/60 p-3 text-center dark:bg-emerald-500/10">
                  <span className="text-[11px] text-emerald-700 dark:text-emerald-300 font-medium">
                    Attendance Percentage
                  </span>
                  <p className="mt-0.5 text-base font-bold text-emerald-800 dark:text-emerald-200">
                    {selectedCourse.attendancePercent}%
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
