import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import TeacherResultsManager from "@/components/teacher/TeacherResultsManager";

export default function TeacherResultsPage() {
  return (
    <>
      <PageMeta
        title="Student Examination Results | Madrassa MIS"
        description="Filter by department, darja, section, and subject to record student marks and grades."
      />
      <PageBreadcrumb pageTitle="Student Results Management" />

      <div className="space-y-6">
        <TeacherResultsManager />
      </div>
    </>
  );
}

