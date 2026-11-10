import { useState } from "react";
import {
  TEACHER_SALARY_SLIPS,
  type TeacherSalarySlip,
} from "@/services/teacherData";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { DollarLineIcon, DownloadIcon, EyeIcon } from "@/icons";

export default function TeacherSalaryCard() {
  const [selectedSlip, setSelectedSlip] = useState<TeacherSalarySlip | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const handleOpenSlip = (slip: TeacherSalarySlip) => {
    setSelectedSlip(slip);
    openModal();
  };

  const latestSlip = TEACHER_SALARY_SLIPS[0];

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-xs dark:bg-brand-500/15 dark:text-brand-400">
            <DollarLineIcon className="size-6" />
          </div>
          <div>
            <h2 className="text-base font-bold text-gray-900 sm:text-lg dark:text-white">
              Faculty Salary & Payroll Breakdown
            </h2>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Monthly pay slips, allowances, institutional deductions, and net bank disbursements.
            </p>
          </div>
        </div>

        <Badge color="success" size="sm">
          Status: All Slips Settled
        </Badge>
      </div>

      {/* KPI Cards */}
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3.5 dark:border-gray-800 dark:bg-gray-800/40">
          <span className="text-xs text-gray-500 dark:text-gray-400">Basic Monthly Pay:</span>
          <p className="mt-1 text-lg font-bold text-gray-900 dark:text-white">
            Rs. {latestSlip.basicSalary.toLocaleString()}
          </p>
          <span className="text-[11px] text-gray-400">Scale: BPS-17 Equivalent</span>
        </div>

        <div className="rounded-xl border border-gray-100 bg-success-50/40 p-3.5 dark:border-gray-800 dark:bg-success-500/10">
          <span className="text-xs text-success-700 dark:text-success-400">Total Allowances:</span>
          <p className="mt-1 text-lg font-bold text-success-700 dark:text-success-300">
            Rs. {(latestSlip.grossSalary - latestSlip.basicSalary).toLocaleString()}
          </p>
          <span className="text-[11px] text-success-600/80">Conveyance + Hostel + Research</span>
        </div>

        <div className="rounded-xl border border-gray-100 bg-warning-50/40 p-3.5 dark:border-gray-800 dark:bg-warning-500/10">
          <span className="text-xs text-warning-700 dark:text-warning-400">Monthly Deductions:</span>
          <p className="mt-1 text-lg font-bold text-warning-700 dark:text-warning-300">
            Rs. {latestSlip.totalDeductions.toLocaleString()}
          </p>
          <span className="text-[11px] text-warning-600/80">Provident Fund & Income Tax</span>
        </div>

        <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-3.5 dark:border-brand-500/30 dark:bg-brand-500/10">
          <span className="text-xs text-brand-700 dark:text-brand-300">Net Disbursed Pay:</span>
          <p className="mt-1 text-lg font-bold text-brand-700 dark:text-brand-300">
            Rs. {latestSlip.netSalary.toLocaleString()}
          </p>
          <span className="text-[11px] text-brand-600/80">Credited to Bank Account</span>
        </div>
      </div>

      {/* Salary Slips Table */}
      <div className="mt-5 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
        <div className="max-w-full overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              <TableRow>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Voucher / Slip No
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Pay Period / Month
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-end text-xs font-bold uppercase">
                  Gross Pay
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-end text-xs font-bold uppercase">
                  Deductions
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-end text-xs font-bold uppercase">
                  Net Disbursed
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-xs font-bold uppercase">
                  Status
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-start text-xs font-bold uppercase">
                  Payment Mode & Bank
                </TableCell>
                <TableCell isHeader className="px-4 py-3 text-center text-xs font-bold uppercase">
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {TEACHER_SALARY_SLIPS.map((slip) => (
                <TableRow
                  key={slip.slipNo}
                  className="transition hover:bg-gray-50/50 dark:hover:bg-white/2"
                >
                  {/* Slip No */}
                  <TableCell className="px-4 py-3 text-xs font-bold text-gray-900 dark:text-white">
                    {slip.slipNo}
                  </TableCell>

                  {/* Month */}
                  <TableCell className="px-4 py-3 text-xs font-medium text-gray-800 dark:text-gray-200">
                    {slip.month}
                  </TableCell>

                  {/* Gross Pay */}
                  <TableCell className="px-4 py-3 text-end text-xs font-semibold text-gray-900 dark:text-white">
                    Rs. {slip.grossSalary.toLocaleString()}
                  </TableCell>

                  {/* Deductions */}
                  <TableCell className="px-4 py-3 text-end text-xs font-semibold text-error-600 dark:text-error-400">
                    - Rs. {slip.totalDeductions.toLocaleString()}
                  </TableCell>

                  {/* Net Pay */}
                  <TableCell className="px-4 py-3 text-end text-xs font-bold text-brand-600 dark:text-brand-400">
                    Rs. {slip.netSalary.toLocaleString()}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="px-4 py-3 text-center">
                    <Badge color="success" size="sm">
                      {slip.paymentStatus}
                    </Badge>
                  </TableCell>

                  {/* Bank Account */}
                  <TableCell className="px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
                    <p className="truncate font-medium text-gray-700 dark:text-gray-300">
                      {slip.bankAccount}
                    </p>
                    <p className="text-[10px] text-gray-400">{slip.paymentDate}</p>
                  </TableCell>

                  {/* Action */}
                  <TableCell className="px-4 py-3 text-center">
                    <button
                      type="button"
                      onClick={() => handleOpenSlip(slip)}
                      className="inline-flex items-center gap-1 rounded-lg border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-brand-600 shadow-2xs transition hover:bg-brand-50 dark:border-gray-700 dark:bg-gray-800 dark:text-brand-400 dark:hover:bg-brand-500/10"
                    >
                      <EyeIcon className="size-3" />
                      <span>Slip Details</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal for Salary Slip Breakdown */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-lg p-6">
        <div>
          {/* Slip Header */}
          <div className="border-b border-gray-100 pb-3 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <span className="rounded-md bg-brand-50 px-2.5 py-0.5 text-xs font-bold text-brand-700 dark:bg-brand-900/40 dark:text-brand-300">
                Official Pay Voucher
              </span>
              <span className="text-xs font-bold text-gray-500 dark:text-gray-400">
                Slip #{selectedSlip?.slipNo}
              </span>
            </div>

            <h3 className="mt-2 text-lg font-bold text-gray-900 dark:text-white">
              Faculty Salary Slip &bull; {selectedSlip?.month}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Department of Dars-e-Nizami &bull; Jamia Accounts Office
            </p>
          </div>

          {/* Details Breakdown */}
          <div className="mt-4 space-y-3 text-xs">
            <div className="rounded-xl border border-gray-100 bg-gray-50/70 p-3 dark:border-gray-800 dark:bg-gray-800/40">
              <p className="font-semibold text-gray-700 dark:text-gray-300">
                Employee: Maulana Aurang Zaib Rehman (TCH-004)
              </p>
              <p className="text-[11px] text-gray-500">
                Disbursement Account: {selectedSlip?.bankAccount}
              </p>
            </div>

            {/* Earnings */}
            <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
              <span className="font-bold text-gray-900 dark:text-white">Monthly Earnings:</span>
              <div className="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Basic Pay:</span>
                  <span className="font-semibold">Rs. {selectedSlip?.basicSalary.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Conveyance Allowance:</span>
                  <span className="font-semibold">Rs. {selectedSlip?.conveyanceAllowance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Hostel Supervision Allowance:</span>
                  <span className="font-semibold">Rs. {selectedSlip?.hostelSupervisionAllowance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Academic Research Allowance:</span>
                  <span className="font-semibold">Rs. {selectedSlip?.researchAllowance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-1 font-bold text-gray-900 dark:border-gray-800 dark:text-white">
                  <span>Gross Earnings:</span>
                  <span>Rs. {selectedSlip?.grossSalary.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="rounded-xl border border-gray-100 p-3 dark:border-gray-800">
              <span className="font-bold text-error-700 dark:text-error-400">Institutional Deductions:</span>
              <div className="mt-2 space-y-1 text-gray-600 dark:text-gray-300">
                <div className="flex justify-between">
                  <span>Provident Fund (5%):</span>
                  <span className="font-semibold text-error-600">Rs. {selectedSlip?.providentFundDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Income Tax Withholding:</span>
                  <span className="font-semibold text-error-600">Rs. {selectedSlip?.taxDeduction.toLocaleString()}</span>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-1 font-bold text-error-700 dark:border-gray-800 dark:text-error-400">
                  <span>Total Deductions:</span>
                  <span>Rs. {selectedSlip?.totalDeductions.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Net Amount Banner */}
            <div className="flex items-center justify-between rounded-xl bg-brand-50 p-3 font-bold text-brand-800 dark:bg-brand-950/40 dark:text-brand-300">
              <span className="text-sm">Net Disbursed Amount:</span>
              <span className="text-base">Rs. {selectedSlip?.netSalary.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-brand-600 dark:text-gray-400 dark:hover:text-brand-400"
            >
              <DownloadIcon className="size-3.5" />
              <span>Print Salary Voucher</span>
            </button>
            <Button size="sm" variant="outline" onClick={closeModal}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

