import { ArrowRightIcon } from "@/icons";
import React from "react";
import { Link } from "react-router";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface PublicPageBannerProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
}

export const PublicPageBanner: React.FC<PublicPageBannerProps> = ({
  title,
  description,
  breadcrumbs,
}) => {
  return (
    <div className="relative overflow-hidden border-b border-gray-200 bg-gradient-to-br from-brand-950 via-brand-900 to-gray-900 py-12 px-4 text-white sm:px-6 lg:px-8 dark:border-gray-800">
      {/* Decorative background grid */}
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="banner-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 32V0h32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#banner-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Breadcrumb nav */}
        <nav className="mb-3 flex items-center gap-1.5 text-xs text-brand-200">
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={crumb.label}>
              {idx > 0 && (
                <ArrowRightIcon className="size-3.5 opacity-60 rtl:rotate-180" />
              )}
              {crumb.path ? (
                <Link
                  to={crumb.path}
                  className="hover:text-white transition-colors"
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className="font-semibold text-white">{crumb.label}</span>
              )}
            </React.Fragment>
          ))}
        </nav>

        {/* Page Title */}
        <h1 className="font-outfit text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
          {title}
        </h1>

        {description && (
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-brand-100/90 sm:text-base">
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

export default PublicPageBanner;
