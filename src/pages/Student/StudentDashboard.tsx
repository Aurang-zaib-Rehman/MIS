import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import StudentTimetableCard from "@/components/student/StudentTimetableCard";
import PreviousExamResultTable from "@/components/student/PreviousExamResultTable";

export default function StudentDashboard() {
  return (
    <>
      <PageMeta
        title="Student Academic Dashboard | Madrassa MIS"
        description="Daily class timetable and previous examination results for students."
      />
      <PageBreadcrumb pageTitle="Student Academic Dashboard" />

      <div className="space-y-6">
        {/* 1. Timetable First (Top Section) */}
        <StudentTimetableCard />

        {/* 2. Previous Examination Results Data Table */}
        <PreviousExamResultTable />
      </div>
    </>
  );
}
