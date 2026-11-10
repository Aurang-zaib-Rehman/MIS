import { useAuth } from "@/context/AuthContext";
import Button from "@/components/ui/button/Button";
import { DownloadIcon } from "@/icons";
import { TEACHER_PROFILE_DETAILS } from "@/services/teacherData";

export default function TeacherIdCard() {
  const { currentUser } = useAuth();
  const profile = currentUser?.teacherProfile;

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="mb-6 rounded-2xl border border-gray-200 bg-white p-5 lg:p-6 shadow-xs dark:border-gray-800 dark:bg-white/3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white">
            Official Faculty ID Card (بطاقة الأستاذ)
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Institutional faculty identity badge for campus access, biometric verification, and administrative privileges
          </p>
        </div>
        <Button size="sm" onClick={handlePrintCard}>
          <DownloadIcon className="size-4" />
          Print ID Card
        </Button>
      </div>

      <div className="mt-5 flex justify-center">
        {/* Physical Smart ID Card Simulation */}
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl border-2 border-brand-500/40 bg-linear-to-br from-white via-brand-50/20 to-blue-50/30 p-5 shadow-lg dark:border-brand-500/30 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
          {/* Card Top Decorative Header */}
          <div className="border-b border-gray-200 pb-3 text-center dark:border-gray-700">
            <p className="text-[10px] font-arabic font-bold text-brand-700 dark:text-brand-300">
              بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيمِ
            </p>
            <h4 className="mt-0.5 text-xs font-extrabold uppercase tracking-wider text-gray-900 dark:text-white">
              JAMIA MADRASSA ULOOM-E-ISLAMIA
            </h4>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">
              Faculty of Islamic Sciences &bull; Affiliated with Wifaq-ul-Madaris
            </p>
            <div className="mt-1.5 inline-block rounded-md bg-brand-600 px-3 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
              FACULTY IDENTITY CARD &bull; بطاقة الأستاذ
            </div>
          </div>

          {/* Card Body */}
          <div className="mt-4 flex items-center gap-4">
            <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border-2 border-brand-500 bg-gray-100 shadow-sm dark:bg-gray-800">
              <img
                src={currentUser?.avatar || "/images/user/owner.jpg"}
                alt={currentUser?.name || "Teacher"}
                className="size-full object-cover"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h5 className="truncate text-sm font-bold text-gray-900 dark:text-white">
                {currentUser?.name || TEACHER_PROFILE_DETAILS.name}
              </h5>
              <p className="font-arabic text-xs font-semibold text-brand-700 dark:text-brand-300">
                {TEACHER_PROFILE_DETAILS.arabicTitle}
              </p>
              <div className="mt-1 space-y-0.5 text-[11px] text-gray-600 dark:text-gray-300">
                <p>
                  <strong className="text-gray-700 dark:text-gray-200">Teacher ID:</strong>{" "}
                  {profile?.teacherId || TEACHER_PROFILE_DETAILS.teacherId}
                </p>
                <p>
                  <strong className="text-gray-700 dark:text-gray-200">Designation:</strong>{" "}
                  {profile?.designation || TEACHER_PROFILE_DETAILS.designation}
                </p>
                <p>
                  <strong className="text-gray-700 dark:text-gray-200">Department:</strong>{" "}
                  {profile?.department || TEACHER_PROFILE_DETAILS.department}
                </p>
              </div>
            </div>
          </div>

          {/* Card Footer Bar */}
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-3 text-[10px] text-gray-500 dark:border-gray-700 dark:text-gray-400">
            <div>
              <span>Status: </span>
              <strong className="text-success-600 dark:text-success-400">Permanent Senior Faculty</strong>
            </div>
            <div>
              <span>Session: </span>
              <strong>1446-1447 AH</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

