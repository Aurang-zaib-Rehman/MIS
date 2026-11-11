import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import AdminMetrics from "@/components/admin/AdminMetrics";
import AcademicOverviewCard from "@/components/admin/AcademicOverviewCard";
import RecentApplicationsTable from "@/components/admin/RecentApplicationsTable";

export default function Ecommerce() {
  return (
    <>
      <PageMeta
        title="Admin Institutional Dashboard | Madrassa MIS"
        description="Central administrative dashboard for Jamia Madrassa Uloom-e-Islamia: student counts, faculty staff, donor funds, expense metrics, academic overview, and admission intake."
      />
      <PageBreadcrumb pageTitle="Admin Institutional Dashboard" />

      <div className="space-y-6">
        {/* 1. Top 4 Metric Cards: Total Students, Total Staff, Total Donations, Total Expense */}
        <AdminMetrics />

        {/* 2. Full-Screen Card: Academic Overview (Left: Beautiful Pie Chart, Right: Key Features) */}
        <AcademicOverviewCard />

        {/* 3. Recent Admission Applications Table (5 entries, right bottom 'See All' expander) */}
        <RecentApplicationsTable />
      </div>
    </>
  );
}
