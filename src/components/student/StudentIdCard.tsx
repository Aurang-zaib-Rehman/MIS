import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/button/Button";
import { DownloadIcon } from "@/icons";

export default function StudentIdCard() {
  const { currentUser } = useAuth();
  const profile = currentUser?.studentProfile;

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Official Digital Student ID Card (بطاقة الطالب)
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Institutional smart badge for campus entry, library borrowing, and dining hall verification
          </p>
        </div>
        <Button size="sm" onClick={handlePrintCard}>
          <DownloadIcon className="size-4" />
          Print ID Card
        </Button>
      </div>

      <div className="mt-5 flex justify-center">
        {/* Physical Smart ID Card Simulation */}
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-brand-500/40 bg-linear-to-br from-white via-brand-50/20 to-emerald-50/30 p-5 shadow-lg dark:border-brand-500/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
          {/* Card Top Decorative Header */}
          <div className="border-b border-gray-200 pb-3 text-center dark:border-gray-700">
            <p className="text-[10px] font-arabic font-bold text-brand-700 dark:text-brand-300">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
            </p>
            <h4 className="mt-0.5 text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
              JAMIA MADRASSA ULOOM-E-ISLAMIA
            </h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              Faisalabad, Pakistan &bull; Affiliated with Wifaq-ul-Madaris
            </p>
            <div className="mt-1.5 inline-block rounded-md bg-brand-600 px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              STUDENT IDENTITY CARD &bull; بطاقة الطالب
            </div>
          </div>

          {/* Card Body */}
          <div className="mt-4 flex items-center gap-4">
            {/* Student Photo */}
            <div className="shrink-0 text-center">
              <div className="size-24 overflow-hidden rounded-xl border-2 border-brand-500/40 ring-2 ring-brand-500/20 shadow-xs">
                <img
                  src={currentUser?.avatar || "/images/user/owner.png"}
                  alt={currentUser?.name || "Student"}
                  className="size-full object-cover"
                />
              </div>
              <span className="mt-1.5 inline-block rounded-sm bg-emerald-100 px-1.5 py-0.2 text-[9px] font-bold text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                ACTIVE
              </span>
            </div>

            {/* Student Particulars */}
            <div className="flex-1 space-y-1 text-xs">
              <h5 className="text-sm font-bold text-gray-900 dark:text-white">
                {currentUser?.name || "Muhammad Abdullah Khan"}
              </h5>
              <p className="text-[11px] text-gray-500 dark:text-gray-400">
                S/O <strong className="text-gray-700 dark:text-gray-300">{profile?.guardianName || "Hafiz Tariq Mahmood"}</strong>
              </p>
              <div className="pt-1 space-y-0.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-gray-500">Roll No:</span>
                  <span className="font-mono font-bold text-brand-600 dark:text-brand-400">
                    {profile?.rollNo || "24-DS-042"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Reg No:</span>
                  <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">
                    WMA-REG-2024-981
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Darja:</span>
                  <span className="font-semibold text-gray-800 dark:text-gray-200">
                    {profile?.darja || "Darja Saniya"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Hostel:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Boarder (Room 14)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Barcode & Security Hologram Footer */}
          <div className="mt-4 border-t border-gray-200 pt-3 text-[10px] dark:border-gray-700 flex items-center justify-between">
            <div>
              <p className="font-mono font-bold tracking-widest text-gray-700 dark:text-gray-300">
                ||||| | |||| ||| |||||| | |||
              </p>
              <span className="text-[9px] text-gray-400">CARD ID: 8849-1446-24-042</span>
            </div>

            <div className="text-end">
              <span className="text-[9px] text-gray-400 block">Valid Thru:</span>
              <strong className="text-gray-700 dark:text-gray-300">30 Shaban 1447 AH</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
