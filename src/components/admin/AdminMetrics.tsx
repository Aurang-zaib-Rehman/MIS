import { ADMIN_KPI_DATA } from "@/services/adminData";
import Badge from "@/components/ui/badge/Badge";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  DollarLineIcon,
  GroupIcon,
  UserIcon,
} from "@/icons";

export default function AdminMetrics() {
  const { totalStudents, totalStaff, totalDonations, totalExpense } =
    ADMIN_KPI_DATA;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
      {/* 1. Total Students */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
        <div className="flex items-center justify-between">
          <div className="flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
            <GroupIcon className="size-6" />
          </div>
          <Badge color={totalStudents.isPositive ? "success" : "error"}>
            {totalStudents.isPositive ? (
              <ArrowUpIcon className="size-3" />
            ) : (
              <ArrowDownIcon className="size-3" />
            )}
            {totalStudents.trend}
          </Badge>
        </div>

        <div className="mt-4">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Total Students
          </span>
          <h4 className="mt-1 text-title-md font-extrabold text-gray-900 dark:text-white">
            {totalStudents.formatted}
          </h4>
          <p className="mt-1 truncate text-xs text-gray-400 dark:text-gray-500">
            {totalStudents.subtitle}
          </p>
        </div>
      </div>

      {/* 2. Total Staff */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
        <div className="flex items-center justify-between">
          <div className="flex size-12 items-center justify-center rounded-xl bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-400">
            <UserIcon className="size-6" />
          </div>
          <Badge color={totalStaff.isPositive ? "success" : "error"}>
            {totalStaff.isPositive ? (
              <ArrowUpIcon className="size-3" />
            ) : (
              <ArrowDownIcon className="size-3" />
            )}
            {totalStaff.trend}
          </Badge>
        </div>

        <div className="mt-4">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Total Staff
          </span>
          <h4 className="mt-1 text-title-md font-extrabold text-gray-900 dark:text-white">
            {totalStaff.formatted}
          </h4>
          <p className="mt-1 truncate text-xs text-gray-400 dark:text-gray-500">
            {totalStaff.subtitle}
          </p>
        </div>
      </div>

      {/* 3. Total Donations */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
        <div className="flex items-center justify-between">
          <div className="flex size-12 items-center justify-center rounded-xl bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
            <DollarLineIcon className="size-6" />
          </div>
          <Badge color={totalDonations.isPositive ? "success" : "error"}>
            {totalDonations.isPositive ? (
              <ArrowUpIcon className="size-3" />
            ) : (
              <ArrowDownIcon className="size-3" />
            )}
            {totalDonations.trend}
          </Badge>
        </div>

        <div className="mt-4">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Total Donations
          </span>
          <h4 className="mt-1 text-title-md font-extrabold text-gray-900 dark:text-white">
            {totalDonations.formatted}
          </h4>
          <p className="mt-1 truncate text-xs text-gray-400 dark:text-gray-500">
            {totalDonations.subtitle}
          </p>
        </div>
      </div>

      {/* 4. Total Expense */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
        <div className="flex items-center justify-between">
          <div className="flex size-12 items-center justify-center rounded-xl bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-warning-400">
            <BoxIconLine className="size-6" />
          </div>
          <Badge color="warning">
            <ArrowDownIcon className="size-3" />
            {totalExpense.trend}
          </Badge>
        </div>

        <div className="mt-4">
          <span className="text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            Total Expense
          </span>
          <h4 className="mt-1 text-title-md font-extrabold text-gray-900 dark:text-white">
            {totalExpense.formatted}
          </h4>
          <p className="mt-1 truncate text-xs text-gray-400 dark:text-gray-500">
            {totalExpense.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}

