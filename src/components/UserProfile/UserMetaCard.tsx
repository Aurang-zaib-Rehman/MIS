import { useModal } from "../../hooks/useModal";
import { useAuth } from "../../hooks/useAuth";
import Badge from "../ui/badge/Badge";
import { PencilIcon } from "../../icons";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { Modal } from "../ui/modal";
import { useState } from "react";

export default function UserMetaCard() {
  const { currentUser } = useAuth();
  const { isOpen, openModal, closeModal } = useModal();
  const [displayName, setDisplayName] = useState(currentUser?.name || "");

  const handleSave = () => {
    // Development-only mock save
    closeModal();
  };

  const roleColorMap = {
    ADMIN: "primary" as const,
    TEACHER: "info" as const,
    STUDENT: "success" as const,
  };

  const userRole = currentUser?.role || "STUDENT";

  return (
    <>
      <div className="mb-6 rounded-2xl border border-gray-200 p-5 lg:p-6 dark:border-gray-800">
        <div className="flex flex-col gap-5 sm:flex-row xl:gap-10">
          <div className="flex-1">
            <div className="mb-6 flex flex-col gap-5 sm:flex-row xl:items-center xl:justify-between">
              <div className="flex w-full flex-col items-start gap-6 sm:flex-row sm:items-center">
                <div className="overflow-hidden rounded-full border border-gray-200 ring-4 ring-brand-500/10 dark:border-gray-800">
                  <img
                    src={currentUser?.avatar || "/images/user/owner.png"}
                    className="size-20 object-cover"
                    alt={currentUser?.name || "User Avatar"}
                  />
                </div>
                <div className="text-start">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-bold text-gray-800 dark:text-white/90">
                      {currentUser?.name || "Academic User"}
                    </h4>
                    <Badge color={roleColorMap[userRole]} size="sm">
                      {currentUser?.role || "STUDENT"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-3 text-sm text-gray-500 dark:text-gray-400">
                    {currentUser?.role === "STUDENT" && currentUser.studentProfile && (
                      <p>
                        Roll No: <span className="font-semibold text-gray-700 dark:text-gray-300">{currentUser.studentProfile.rollNo}</span> &bull; {currentUser.studentProfile.darja}
                      </p>
                    )}
                    {currentUser?.role === "TEACHER" && currentUser.teacherProfile && (
                      <p>
                        Staff ID: <span className="font-semibold text-gray-700 dark:text-gray-300">{currentUser.teacherProfile.teacherId}</span> &bull; {currentUser.teacherProfile.designation}
                      </p>
                    )}
                    {currentUser?.role === "ADMIN" && (
                      <p>Superuser Administrator &bull; Idara-e-Aaliya</p>
                    )}
                    <div className="hidden h-3.5 w-px bg-gray-300 sm:block dark:bg-gray-700"></div>
                    <p>Madrasa Uloom-e-Islamia, Faisalabad</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Role-Based Academic Profile Grid */}
            <div className="relative grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 xl:gap-x-11 xl:gap-y-6">
              <div>
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Full Name
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                  {currentUser?.name || "User Name"}
                </p>
              </div>

              <div>
                <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                  Registered Email
                </p>
                <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                  {currentUser?.email || "user@madrassa.com"}
                </p>
              </div>

              {currentUser?.role === "STUDENT" && currentUser.studentProfile && (
                <>
                  <div>
                    <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Enrolled Darja
                    </p>
                    <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                      {currentUser.studentProfile.darja}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Department
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      {currentUser.studentProfile.department}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Guardian / Father Name
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      {currentUser.studentProfile.guardianName}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Admission Year
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      {currentUser.studentProfile.admissionYear} Hijri / AD
                    </p>
                  </div>
                </>
              )}

              {currentUser?.role === "TEACHER" && currentUser.teacherProfile && (
                <>
                  <div>
                    <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Designation
                    </p>
                    <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                      {currentUser.teacherProfile.designation}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Department
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      {currentUser.teacherProfile.department}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Assigned Classes
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      {currentUser.teacherProfile.assignedClasses.join(", ")}
                    </p>
                  </div>

                  <div className="col-span-2">
                    <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Assigned Courses / Kutub
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      {currentUser.teacherProfile.assignedCourses.join(", ")}
                    </p>
                  </div>
                </>
              )}

              {currentUser?.role === "ADMIN" && (
                <>
                  <div>
                    <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Authority Level
                    </p>
                    <p className="text-sm font-semibold text-brand-600 dark:text-brand-400">
                      Unrestricted Superuser
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium text-gray-500 dark:text-gray-400">
                      Administrative Office
                    </p>
                    <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      Markazi Idara / Chancellor Office
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <button
              onClick={openModal}
              className="flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 lg:inline-flex lg:w-auto dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/3 dark:hover:text-gray-200"
            >
              <PencilIcon className="size-4.5" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[600px]">
        <div className="relative no-scrollbar w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-6 lg:p-8 dark:bg-gray-900">
          <div className="mb-6">
            <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
              Personal Information
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Verify or update your profile display name.
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div>
              <Label>Email Address</Label>
              <Input
                type="email"
                value={currentUser?.email || ""}
                disabled
              />
              <span className="text-[11px] text-gray-400 mt-1 block">
                Email address is managed by Madrassa Administration.
              </span>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 pt-3">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
