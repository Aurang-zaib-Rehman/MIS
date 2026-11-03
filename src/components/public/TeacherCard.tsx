import Badge from "@/components/ui/badge/Badge";
import React from "react";

export interface TeacherProfile {
  id: string;
  name: string;
  designation: string;
  department: string;
  qualification: string;
  specialty: string;
  image: string;
  experienceYears: number;
}

interface TeacherCardProps {
  teacher: TeacherProfile;
}

export const TeacherCard: React.FC<TeacherCardProps> = ({ teacher }) => {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200 bg-white p-5 shadow-theme-xs transition-all hover:border-brand-300 hover:shadow-theme-md dark:border-gray-800 dark:bg-gray-900">
      <div>
        {/* Avatar & Department Badge */}
        <div className="flex items-center gap-4 mb-4">
          <div className="relative size-16 shrink-0 overflow-hidden rounded-full border-2 border-brand-200 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
            <img
              src={teacher.image}
              alt={teacher.name}
              className="size-full object-cover"
              onError={(e) => {
                // Fallback to placeholder if image fails
                (e.target as HTMLImageElement).src = "/images/user/user-01.jpg";
              }}
            />
          </div>
          <div>
            <Badge color="primary" size="sm">
              {teacher.department}
            </Badge>
            <h3 className="mt-1 font-outfit text-base font-bold text-gray-900 dark:text-white">
              {teacher.name}
            </h3>
            <p className="text-xs font-medium text-brand-600 dark:text-brand-400">
              {teacher.designation}
            </p>
          </div>
        </div>

        {/* Qualification & Specialty Details */}
        <div className="space-y-2 rounded-xl bg-gray-50 p-3 text-xs text-gray-600 dark:bg-white/5 dark:text-gray-300">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500 dark:text-gray-400">Sanad / Degree:</span>
            <span className="text-end font-medium text-gray-800 dark:text-gray-200">
              {teacher.qualification}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-500 dark:text-gray-400">Specialty:</span>
            <span className="text-end font-medium text-gray-800 dark:text-gray-200">
              {teacher.specialty}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 text-xs text-gray-400 dark:border-gray-800 flex items-center justify-between">
        <span>Teaching Experience</span>
        <span className="font-semibold text-gray-700 dark:text-gray-300">
          {teacher.experienceYears}+ Years
        </span>
      </div>
    </div>
  );
};

export default TeacherCard;

