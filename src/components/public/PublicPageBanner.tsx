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
  backgroundImage?: string;
  imagePosition?: string;
}

export const PublicPageBanner: React.FC<PublicPageBannerProps> = ({
  title,
  description,
  breadcrumbs,
  backgroundImage = "/images/courses-banner.jpg",
  imagePosition = "object-[75%_35%] sm:object-[72%_35%] md:object-[68%_38%] lg:object-[65%_38%]",
}) => {
  return (
    <div className="relative overflow-hidden border-b border-gray-200 bg-gray-950 py-14 px-4 text-white sm:py-18 lg:py-22 sm:px-6 lg:px-8 dark:border-gray-800">
      {/* Background image container */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src={backgroundImage}
          alt=""
          className={`h-full w-full object-cover ${imagePosition}`}
        />
        {/* Soft atmospheric gradient: deep navy/dark on text side (start), fading to transparent on child side (end) */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent sm:via-gray-950/70 sm:to-transparent/10 rtl:bg-gradient-to-l" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-gray-950/30" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Breadcrumb nav */}
          <nav className="mb-2 flex items-center gap-1.5 text-xs text-brand-200">
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
          <h1 className="font-outfit text-2xl font-bold tracking-tight text-white drop-shadow-sm sm:text-3xl lg:text-4xl">
            {title}
          </h1>

          {description && (
            <p className="mt-2 text-sm leading-relaxed text-brand-100/90 drop-shadow-sm sm:text-base">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PublicPageBanner;
