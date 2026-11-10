import { useState } from "react";
import {
  INITIAL_STUDENT_MARKS,
  type StudentMarksEntry,
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
import { CheckCircleIcon } from "@/icons";

function calculateGrade(
  percentage: number
): "Mumtaz" | "Jayyid Jiddan" | "Jayyid" | "Maqbool" | "Rasib" {
  if (percentage >= 85) return "Mumtaz";
  if (percentage >= 75) return "Jayyid Jiddan";
  if (percentage >= 60) return "Jayyid";
  if (percentage >= 40) return "Maqbool";
  return "Rasib";
}

export default function TeacherResultsManager() {
  // Filter States
  const [selectedDepartment, setSelectedDepartment] = useState("Department of Dars-e-Nizami");
  const [selectedDarja, setSelectedDarja] = useState("Darja Saniya (Year 2)");
  const [selectedSection, setSelectedSection] = useState("Section A");
  const [selectedSubject, setSelectedSubject] = useState("Ilm-us-Sarf");
  const [selectedExam, setSelectedExam] = useState("Mid-Term Examination 1447 AH");

  // Marks Records State
  const [marksList, setMarksList] = useState<StudentMarksEntry[]>(INITIAL_STUDENT_MARKS);
  const [isSaved, setIsSaved] = useState(false);
  const [lastSavedTime, setLastSavedTime] = useState<string | null>(null);

  // Obtained Marks Change Handler
  const handleMarksChange = (id: string, value: string) => {
    const numericVal = Math.max(0, Math.min(100, Number(value) || 0));

    setMarksList((prev) =>
      prev.map((student) => {
        if (student.id !== id) return student;
        const percentage = Number(
          ((numericVal / student.totalMarks) * 100).toFixed(1)
        );
        const grade = calculateGrade(percentage);
        return {
          ...student,
          obtainedMarks: numericVal,
          percentage,
          grade,
        };
      })
    );
    setIsSaved(false);
  };

  // Remarks Change Handler
  const handleRemarksChange = (id: string, remarks: string) => {
    setMarksList((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, remarks } : student
      )
    );
    setIsSaved(false);
  };

  // Save Handler
  const handleSaveMarks = () => {
    const timeString = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    setLastSavedTime(timeString);
    setIsSaved(true);
  };

  // Aggregate Metrics
  const totalStudents = marksList.length;
  const totalObtainedSum = marksList.reduce(
    (acc, curr) => acc + curr.obtainedMarks,
    0
  );
  const classAverage =
    totalStudents > 0 ? (totalObtainedSum / totalStudents).toFixed(1) : "0";
  const highestMarks =
    totalStudents > 0
      ? Math.max(...marksList.map((m) => m.obtainedMarks))
      : 0;
  const passCount = marksList.filter((m) => m.obtainedMarks >= 40).length;
  const passPercentage =
    totalStudents > 0 ? ((passCount / totalStudents) * 100).toFixed(1) : "0";

  return (
    <div className="space-y-6">
      {/* 1. Top Filters Section */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
        <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-3.5 dark:border-gray-800">
          <div>
            <h2 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
              Student Results & Examination Marks Entry
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Filter by department, darja, section, and subject to record or evaluate examination marks.
            </p>
          </div>
          <Badge color="primary" size="sm">
            Examiner: Maulana Aurang Zaib Rehman
          </Badge>
        </div>

        {/* 5 Filters */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Department */}
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

          {/* Darja / Class */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Darja / Class
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

          {/* Section */}
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

          {/* Subject / Course */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Subject / Kitab
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value);
                setIsSaved(false);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 shadow-2xs outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="Ilm-us-Sarf">Ilm-us-Sarf (علم الصرف)</option>
              <option value="Nahw Mir">Nahw Mir (نحو مير)</option>
              <option value="Noor-ul-Idhah">Noor-ul-Idhah (نور الإيضاح)</option>
              <option value="Al-Qiraat-ul-Wadhiha">Al-Qiraat (القراءة الواضحة)</option>
            </select>
          </div>

          {/* Exam Type */}
          <div>
            <label className="mb-1.5 block text-xs font-semibold text-gray-700 dark:text-gray-300">
              Examination
            </label>
            <select
              value={selectedExam}
              onChange={(e) => {
                setSelectedExam(e.target.value);
                setIsSaved(false);
              }}
              className="w-full rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-900 shadow-2xs outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="Mid-Term Examination 1447 AH">Mid-Term Exam 1447 AH</option>
              <option value="First Sessional Test 1447 AH">1st Sessional Test 1447 AH</option>
              <option value="Final Term Wifaq Exam 1446 AH">Final Wifaq Exam 1446 AH</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Marks Roster Table & Evaluation */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
        {/* Subheader & Save Trigger */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
          <div>
            <h3 className="text-sm font-bold text-gray-900 sm:text-base dark:text-white">
              {selectedSubject} &bull; {selectedDarja} ({selectedSection})
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Exam: <strong className="text-gray-700 dark:text-gray-300">{selectedExam}</strong> &bull; Total Marks: 100
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" onClick={handleSaveMarks}>
              Save & Submit Marks
            </Button>
          </div>
        </div>

        {/* Aggregate KPI Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-bold text-gray-700 dark:bg-gray-800 dark:text-gray-300">
            Enrolled: {totalStudents} Students
          </span>
          <span className="rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-bold text-brand-700 dark:bg-brand-500/15 dark:text-brand-400">
            Class Average: {classAverage} / 100
          </span>
          <span className="rounded-lg bg-success-50 px-3 py-1.5 text-xs font-bold text-success-700 dark:bg-success-500/15 dark:text-success-400">
            Highest Score: {highestMarks} / 100
          </span>
          <span className="rounded-lg bg-blue-light-50 px-3 py-1.5 text-xs font-bold text-blue-light-700 dark:bg-blue-light-500/15 dark:text-blue-light-400">
            Passing Rate: {passPercentage}%
          </span>
        </div>

        {/* Save Confirmation Banner */}
        {isSaved && (
          <div className="mt-4 flex items-center justify-between rounded-xl border border-success-200 bg-success-50/70 p-3 text-xs text-success-800 dark:border-success-500/30 dark:bg-success-500/10 dark:text-success-300">
            <span className="flex items-center gap-2 font-semibold">
              <CheckCircleIcon className="size-4 text-success-600 dark:text-success-400" />
              Examination marks successfully submitted and recorded for {selectedSubject}!
            </span>
            <span>Recorded at {lastSavedTime}</span>
          </div>
        )}

        {/* Marks Entry Table */}
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
                  <TableCell isHeader className="w-24 px-4 py-3 text-center text-xs font-bold uppercase">
                    Total
                  </TableCell>
                  <TableCell isHeader className="w-32 px-4 py-3 text-center text-xs font-bold uppercase">
                    Obtained
                  </TableCell>
                  <TableCell isHeader className="w-28 px-4 py-3 text-center text-xs font-bold uppercase">
                    Percentage
                  </TableCell>
                  <TableCell isHeader className="w-32 px-4 py-3 text-center text-xs font-bold uppercase">
                    Wifaq Grade
                  </TableCell>
                  <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                    Academic Remarks
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {marksList.map((student) => (
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

                    {/* Total Marks */}
                    <TableCell className="px-4 py-3 text-center text-xs font-semibold text-gray-500 dark:text-gray-400">
                      {student.totalMarks}
                    </TableCell>

                    {/* Obtained Marks Input */}
                    <TableCell className="px-4 py-3 text-center">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        value={student.obtainedMarks}
                        onChange={(e) => handleMarksChange(student.id, e.target.value)}
                        className="w-20 rounded-lg border border-gray-300 bg-white px-2 py-1 text-center text-xs font-bold text-gray-900 shadow-2xs outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      />
                    </TableCell>

                    {/* Percentage */}
                    <TableCell className="px-4 py-3 text-center text-xs font-bold text-gray-800 dark:text-gray-200">
                      {student.percentage}%
                    </TableCell>

                    {/* Grade Badge */}
                    <TableCell className="px-4 py-3 text-center">
                      <Badge
                        color={
                          student.grade === "Mumtaz"
                            ? "success"
                            : student.grade === "Jayyid Jiddan"
                            ? "primary"
                            : student.grade === "Jayyid"
                            ? "info"
                            : student.grade === "Maqbool"
                            ? "warning"
                            : "error"
                        }
                        size="sm"
                      >
                        {student.grade}
                      </Badge>
                    </TableCell>

                    {/* Remarks Input */}
                    <TableCell className="px-4 py-3">
                      <input
                        type="text"
                        value={student.remarks}
                        onChange={(e) => handleRemarksChange(student.id, e.target.value)}
                        placeholder="Evaluation notes..."
                        className="w-full rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs text-gray-800 shadow-2xs outline-none transition focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Grades adhere to Wifaq-ul-Madaris Al-Arabia Pakistan examination standards.
          </p>
          <Button size="sm" onClick={handleSaveMarks}>
            Save & Finalize Results
          </Button>
        </div>
      </div>
    </div>
  );
}
