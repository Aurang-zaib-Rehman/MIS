import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import DangerZone from "@/components/UserProfile/DangerZone";
import Security from "@/components/UserProfile/Security";
import UserAddressCard from "@/components/UserProfile/UserAddressCard";
import UserMetaCard from "@/components/UserProfile/UserMetaCard";
import { useAuth } from "@/hooks/useAuth";

export default function UserProfiles() {
  const { currentUser } = useAuth();
  const isAdmin = currentUser?.role === "ADMIN";

  return (
    <>
      <PageMeta
        title="Profile & Academic Credentials | Madrassa MIS"
        description="User profile and academic credentials for Madrassa Management Information System"
      />
      <PageBreadcrumb pageTitle="Academic Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 dark:border-gray-800 dark:bg-white/3">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 lg:mb-7 dark:text-white/90">
          User Identity & Credentials
        </h3>
        <div className="space-y-6">
          <UserMetaCard />
          <UserAddressCard />
          <Security />
          {isAdmin && <DangerZone />}
        </div>
      </div>
    </>
  );
}
