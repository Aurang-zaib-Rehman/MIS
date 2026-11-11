import { useState } from "react";
import {
  RECENT_ADMISSION_APPLICATIONS,
  type AdmissionApplicationItem,
} from "@/services/adminData";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import { ChevronDownIcon, ChevronUpIcon, DocsIcon } from "@/icons";

export default function RecentApplicationsTable() {
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedApplications: AdmissionApplicationItem[] = isExpanded
    ? RECENT_ADMISSION_APPLICATIONS
    : RECENT_ADMISSION_APPLICATIONS.slice(0, 5);

  const getStatusColor = (status: AdmissionApplicationItem["status"]) => {
    switch (status) {
      case "Approved":
        return "success";
      case "Interview Passed":
        return "primary";
      case "Merit Verified":
        return "info";
      case "Under Review":
        return "warning";
      case "Awaiting Test":
      default:
        return "light";
    }
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      {/* Table Header & Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-400">
            <DocsIcon className="size-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
              Recent Admission Applications
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              New student registration candidates applying for admission in Session 1446-1447 AH.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge color="primary" size="sm">
            Total Intake Pool: {RECENT_ADMISSION_APPLICATIONS.length} Candidates
          </Badge>
        </div>
      </div>

      {/* Applications Data Table */}
      <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <TableRow>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Application ID
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Candidate Name & Father
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Department
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Target Darja
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Submission Date
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-xs font-bold uppercase">
                  Status
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Guardian Contact
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {displayedApplications.map((app) => (
                <TableRow
                  key={app.id}
                  className="transition hover:bg-gray-50/50 dark:hover:bg-white/2"
                >
                  {/* Application ID */}
                  <TableCell className="px-4 py-3 text-xs font-bold text-brand-600 dark:text-brand-400">
                    {app.applicationNo}
                  </TableCell>

                  {/* Candidate Name */}
                  <TableCell className="px-4 py-3">
                    <p className="text-xs font-bold text-gray-900 dark:text-white">
                      {app.studentName}
                    </p>
                    <p className="text-[11px] text-gray-500 dark:text-gray-400">
                      S/O: {app.fatherName}
                    </p>
                  </TableCell>

                  {/* Department */}
                  <TableCell className="px-4 py-3 text-xs text-gray-700 dark:text-gray-300">
                    {app.appliedDepartment}
                  </TableCell>

                  {/* Target Darja */}
                  <TableCell className="px-4 py-3 text-xs font-medium text-gray-900 dark:text-white">
                    {app.appliedDarja}
                  </TableCell>

                  {/* Date */}
                  <TableCell className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                    {app.applyDate}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3 text-center">
                    <Badge color={getStatusColor(app.status)} size="sm">
                      {app.status}
                    </Badge>
                  </TableCell>

                  {/* Guardian Contact & Previous School */}
                  <TableCell className="px-4 py-3 text-xs text-gray-600 dark:text-gray-300">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {app.contactNumber}
                    </p>
                    <p className="text-[10px] truncate text-gray-400">
                      {app.previousMadrassa}
                    </p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Bottom Footer & Expandable "See All" Action on the Right Bottom */}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-gray-100 pt-3 dark:border-gray-800">
        <span className="text-xs text-gray-500 dark:text-gray-400">
          Showing <strong className="text-gray-800 dark:text-gray-200">{displayedApplications.length}</strong> of{" "}
          <strong className="text-gray-800 dark:text-gray-200">{RECENT_ADMISSION_APPLICATIONS.length}</strong> submitted applications
        </span>

        {/* Right Bottom "See All" Button */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="inline-flex items-center gap-1.5 self-end rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-1.5 text-xs font-bold text-brand-600 transition hover:bg-brand-50 hover:border-brand-300 dark:border-gray-700 dark:bg-gray-800 dark:text-brand-400 dark:hover:bg-brand-500/20"
        >
          <span>{isExpanded ? "Show Less (5 Entries)" : `See All (${RECENT_ADMISSION_APPLICATIONS.length} Applications)`}</span>
          {isExpanded ? (
            <ChevronUpIcon className="size-4" />
          ) : (
            <ChevronDownIcon className="size-4" />
          )}
        </button>
      </div>
    </div>
  );
}

