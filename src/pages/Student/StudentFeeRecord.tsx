import { useState } from "react";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import PageMeta from "@/components/common/PageMeta";
import { STUDENT_FEE_RECORDS, type StudentFeeChallan } from "@/services/studentData";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import { DownloadIcon, FileIcon } from "@/icons";

export default function StudentFeeRecord() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | "Paid" | "Unpaid">("ALL");
  const [selectedVoucher, setSelectedVoucher] = useState<StudentFeeChallan | null>(null);
  const { isOpen, openModal, closeModal } = useModal();

  const filteredRecords = STUDENT_FEE_RECORDS.filter((item) => {
    const matchesSearch =
      item.challanNo.includes(searchTerm) ||
      item.semester.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.voucherNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.paymentMode.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (statusFilter === "ALL") return true;
    return item.challanStatus.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleOpenVoucher = (voucher: StudentFeeChallan) => {
    setSelectedVoucher(voucher);
    openModal();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <PageMeta
        title="Fee Record & Account Book | Madrassa MIS"
        description="Student fee payment ledger, account book, and printable monthly challan vouchers."
      />
      <PageBreadcrumb pageTitle="Fee Record & Account Book" />

      <div className="space-y-6">
        {/* KPI Overview Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-white/3">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Total Fee Paid (Academic Session)
            </span>
            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              Rs. 31,500
            </p>
            <p className="mt-1 text-xs text-success-600 dark:text-success-400 font-medium">
              ✓ 7 Monthly Vouchers Settled
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-white/3">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Outstanding Dues / Arrears
            </span>
            <p className="mt-1 text-2xl font-bold text-success-600 dark:text-success-400">
              Rs. 0
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 font-medium">
              No pending balance on account
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs dark:border-gray-800 dark:bg-white/3">
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Enrollment Category
            </span>
            <p className="mt-1 text-2xl font-bold text-brand-600 dark:text-brand-400">
              Boarder (Muqeem)
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Tuition: Rs. 3,000 | Hostel/Mess: Rs. 1,500
            </p>
          </div>
        </div>

        {/* Account Book Card — Matching Uploaded Image 1 */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-xs dark:border-gray-800 dark:bg-white/3 overflow-hidden">
          {/* Top Blue Header Band */}
          <div className="bg-brand-600 px-5 py-3.5 text-white dark:bg-brand-700 flex items-center justify-between">
            <h2 className="text-base font-bold">Account Book</h2>
            <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full font-medium">
              Student Ledger
            </span>
          </div>

          {/* Search Bar & Entry Controls */}
          <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 dark:border-gray-800">
            <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
              <span>Show</span>
              <select className="rounded-lg border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs dark:border-gray-700 dark:bg-gray-800 dark:text-white">
                <option>25</option>
                <option>50</option>
                <option>100</option>
              </select>
              <span>entries</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Status Filter */}
              <div className="flex gap-1 rounded-xl bg-gray-100 p-1 dark:bg-gray-800">
                {(["ALL", "Paid", "Unpaid"] as const).map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => setStatusFilter(st)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      statusFilter === st
                        ? "bg-white text-brand-600 shadow-xs dark:bg-gray-700 dark:text-white"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="search-input" className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                  Search:
                </label>
                <input
                  id="search-input"
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search Challan, Month..."
                  className="w-52 rounded-lg border border-gray-200 px-3 py-1.5 text-xs text-gray-800 focus:border-brand-500 focus:outline-hidden dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="max-w-full overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader className="border-b border-gray-100 bg-gray-50/70 dark:border-gray-800 dark:bg-gray-800/40">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                  >
                    Challan No
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                  >
                    Semester
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                  >
                    Total Amount
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                  >
                    Challan Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                  >
                    Voucher No
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                  >
                    Payment Date
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                  >
                    Payment Mode
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 text-start text-theme-xs font-semibold text-brand-700 dark:text-brand-300"
                  >
                    Download
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {filteredRecords.length > 0 ? (
                  filteredRecords.map((item) => (
                    <TableRow key={item.challanNo} className="hover:bg-gray-50/50 dark:hover:bg-white/5">
                      <TableCell className="px-4 py-3.5 text-start text-xs font-medium text-gray-800 dark:text-gray-200">
                        {item.challanNo}
                      </TableCell>
                      <TableCell className="px-4 py-3.5 text-start text-xs text-gray-700 dark:text-gray-300">
                        {item.semester}
                      </TableCell>
                      <TableCell className="px-4 py-3.5 text-start text-xs font-bold text-gray-900 dark:text-white">
                        {item.totalAmount}
                      </TableCell>
                      <TableCell className="px-4 py-3.5 text-start">
                        <span className="inline-block rounded-md bg-blue-light-500 px-2.5 py-0.5 text-[11px] font-bold text-white shadow-2xs">
                          {item.challanStatus}
                        </span>
                      </TableCell>
                      <TableCell className="px-4 py-3.5 text-start text-xs font-mono text-gray-600 dark:text-gray-300">
                        {item.voucherNo}
                      </TableCell>
                      <TableCell className="px-4 py-3.5 text-start text-xs text-gray-600 dark:text-gray-300">
                        {item.paymentDate}
                      </TableCell>
                      <TableCell className="px-4 py-3.5 text-start text-xs text-gray-600 dark:text-gray-300">
                        {item.paymentMode}
                      </TableCell>
                      <TableCell className="px-4 py-3.5 text-start">
                        <button
                          type="button"
                          onClick={() => handleOpenVoucher(item)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700 transition hover:bg-brand-500 hover:text-white hover:border-brand-500 dark:border-brand-500/30 dark:bg-brand-500/10 dark:text-brand-300 dark:hover:bg-brand-500 dark:hover:text-white"
                        >
                          <FileIcon className="size-3.5" />
                          <span>View Voucher</span>
                        </button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell isHeader={false} className="px-4 py-8 text-center text-xs text-gray-500">
                      No matching records found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Table Footer */}
          <div className="flex flex-col gap-2 p-4 text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between dark:text-gray-400">
            <span>
              Showing 1 to {filteredRecords.length} of {STUDENT_FEE_RECORDS.length} entries
            </span>
            <div className="flex gap-1">
              <button
                type="button"
                disabled
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs opacity-50 dark:border-gray-700"
              >
                Previous
              </button>
              <button
                type="button"
                className="rounded-lg bg-brand-500 px-2.5 py-1 text-xs font-semibold text-white"
              >
                1
              </button>
              <button
                type="button"
                disabled
                className="rounded-lg border border-gray-200 px-2.5 py-1 text-xs opacity-50 dark:border-gray-700"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Institutional Payment Guide */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-white/3 text-start text-xs">
            <h4 className="font-bold text-gray-900 dark:text-white">
              1. Designated Bank Branches
            </h4>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Deposit cash challan at any Meezan Bank or HBL Islamic branch nationwide before due date.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-white/3 text-start text-xs">
            <h4 className="font-bold text-gray-900 dark:text-white">
              2. On-Campus Cash Office
            </h4>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Accounts Office (Administrative Block) open Mon &ndash; Sat, 08:00 AM &ndash; 02:00 PM.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-4.5 shadow-xs dark:border-gray-800 dark:bg-white/3 text-start text-xs">
            <h4 className="font-bold text-gray-900 dark:text-white">
              3. Online Billing & KuickPay
            </h4>
            <p className="mt-1 text-gray-500 dark:text-gray-400">
              Pay using 1Bill / Kuickpay via Mobile Banking Apps by referencing your unique Challan Number.
            </p>
          </div>
        </div>

        {/* 3-Copy Printable Fee Voucher Modal */}
        <Modal
          isOpen={isOpen}
          onClose={closeModal}
          className="max-w-5xl p-6"
        >
          {selectedVoucher && (
            <div>
              <div className="flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-800">
                <div>
                  <h3 className="text-base font-bold text-gray-900 dark:text-white">
                    Madrasa Uloom-e-Islamia — Official 3-Part Bank Challan
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Challan No: <strong className="text-gray-700 dark:text-gray-300">{selectedVoucher.challanNo}</strong> • Month: {selectedVoucher.semester}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button size="sm" onClick={handlePrint}>
                    <DownloadIcon className="size-4" />
                    Print 3-Part Challan
                  </Button>
                </div>
              </div>

              {/* 3-Part Slip Layout (Madrasa Copy, Bank Copy, Student Copy) */}
              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
                {[
                  { title: "Madrasa Accounts Copy", note: "To be returned to Jamia Accounts" },
                  { title: "Bank / Cashier Copy", note: "Retained by receiving Bank Branch" },
                  { title: "Student / Guardian Copy", note: "Student receipt for records" },
                ].map((copy, index) => (
                  <div
                    key={copy.title}
                    className={`flex flex-col justify-between rounded-xl border p-3.5 text-xs text-start ${
                      index === 0
                        ? "border-brand-300 bg-brand-50/20 dark:border-brand-500/30"
                        : "border-dashed border-gray-300 bg-gray-50/40 dark:border-gray-700 dark:bg-white/2"
                    }`}
                  >
                    <div>
                      {/* Slip Header */}
                      <div className="border-b border-gray-200 pb-2 text-center dark:border-gray-700">
                        <p className="text-[10px] font-arabic text-gray-500 dark:text-gray-400">
                          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
                        </p>
                        <h4 className="mt-0.5 text-xs font-bold text-gray-900 dark:text-white">
                          JAMIA MADRASA ULOOM-E-ISLAMIA
                        </h4>
                        <span className="inline-block rounded-md bg-brand-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-brand-800 dark:bg-brand-900/60 dark:text-brand-300">
                          {copy.title}
                        </span>
                        <p className="mt-1 text-[10px] font-mono font-medium text-gray-500 dark:text-gray-400">
                          {selectedVoucher.bankAccount}
                        </p>
                      </div>

                      {/* Student Particulars */}
                      <div className="mt-2.5 space-y-1.5 text-[11px]">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Challan #:</span>
                          <span className="font-mono font-bold text-gray-900 dark:text-white">{selectedVoucher.challanNo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Student:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">M. Abdullah Khan</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Roll No:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">24-DS-042</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Darja:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">Darja Saniya (Yr 2)</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Month:</span>
                          <span className="font-semibold text-gray-800 dark:text-gray-200">{selectedVoucher.semester}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Due Date:</span>
                          <span className="text-error-600 dark:text-error-400 font-semibold">{selectedVoucher.dueDate}</span>
                        </div>
                      </div>

                      {/* Itemized Charges */}
                      <div className="mt-2.5 border-t border-gray-200 pt-2 text-[11px] dark:border-gray-700 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Tuition Fee:</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">Rs. {selectedVoucher.tuitionFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Hostel & Mess:</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">Rs. {selectedVoucher.hostelFee}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Arrears / Late:</span>
                          <span className="font-medium text-gray-800 dark:text-gray-200">Rs. 0</span>
                        </div>
                        <div className="flex justify-between border-t border-gray-200 pt-1 font-bold text-gray-900 dark:border-gray-700 dark:text-white">
                          <span>Total Payable:</span>
                          <span className="text-brand-600 dark:text-brand-400">Rs. {selectedVoucher.totalAmount}</span>
                        </div>
                      </div>
                    </div>

                    {/* Stamp & Signatures */}
                    <div className="mt-4 border-t border-gray-200 pt-3 text-[10px] dark:border-gray-700 space-y-2">
                      <div className="flex justify-between text-gray-400">
                        <span>Depositor Sign: ________</span>
                        <span>Bank Officer: ________</span>
                      </div>
                      <div className="rounded-md bg-emerald-50 p-1.5 text-center text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">
                        Status: {selectedVoucher.challanStatus} on {selectedVoucher.paymentDate}
                      </div>
                      <p className="text-[9px] text-gray-400 text-center">
                        {copy.note}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}
