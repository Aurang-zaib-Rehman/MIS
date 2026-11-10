import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import TeacherAttendanceManager from "@/components/teacher/TeacherAttendanceManager";

export default function TeacherAttendancePage() {
  return (
    <>
      <PageMeta
        title="Student Attendance Management | Madrassa MIS"
        description="Filter by class, period, and section to record and finalize student attendance."
      />
      <PageBreadcrumb pageTitle="Student Attendance Management" />

      <div className="space-y-6">
        <TeacherAttendanceManager />
      </div>
    </>
  );
}

