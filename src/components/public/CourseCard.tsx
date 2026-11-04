import Badge from "@/components/ui/badge/Badge";
import { ArrowRightIcon } from "@/icons";
import React from "react";
import { Link } from "react-router";

export interface CourseItem {
  id: string;
  title: string;
  department: string;
  description: string;
  duration: string;
  timings: string;
  badge: string;
  badgeColor?: "primary" | "success" | "warning" | "info";
  features: string[];
}

interface CourseCardProps {
  course: CourseItem;
  showEnrollBtn?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({
  course,
  showEnrollBtn = true,
}) => {
  return (
    <div className="flex h-full flex-col justify-between rounded-2xl border border-gray-200/90 bg-white p-6 shadow-theme-xs transition-all hover:border-brand-300 hover:shadow-theme-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-brand-700">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-4">
          <Badge color={course.badgeColor || "primary"} size="sm">
            {course.badge}
          </Badge>
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            {course.duration}
          </span>
        </div>

        {/* Title & Department */}
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
          {course.department}
        </p>
        <h3 className="mt-1 font-outfit text-xl font-bold text-gray-900 dark:text-white">
          {course.title}
        </h3>

        {/* Description */}
        <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
          {course.description}
        </p>

        {/* Timings */}
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-700 dark:bg-white/5 dark:text-gray-300">
          <span className="font-semibold text-brand-600 dark:text-brand-400">
            Schedule:
          </span>
          <span>{course.timings}</span>
        </div>

        {/* Features Checklist */}
        <ul className="mt-4 space-y-1.5 text-xs text-gray-500 dark:text-gray-400">
          {course.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="size-1.5 rounded-full bg-brand-500"></span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Action Footer */}
      {showEnrollBtn && (
        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <Link
            to="/admission"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
          >
            <span>Apply / Enroll</span>
            <ArrowRightIcon className="size-4 rtl:rotate-180" />
          </Link>
          <span className="text-[11px] font-medium text-gray-400">
            Limited Seats
          </span>
        </div>
      )}
    </div>
  );
};

export default CourseCard;

