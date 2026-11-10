import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import TeacherTimetableCard from "@/components/teacher/TeacherTimetableCard";

export default function TeacherDashboard() {
  return (
    <>
      <PageMeta
        title="Teacher Academic Dashboard | Madrassa MIS"
        description="Daily teaching schedule, weekly class timetable, and classroom lectures for faculty members."
      />
      <PageBreadcrumb pageTitle="Teacher Academic Dashboard" />

      <div className="space-y-6">
        {/* Weekly Transposed Matrix Timetable */}
        <TeacherTimetableCard />
      </div>
    </>
  );
}

