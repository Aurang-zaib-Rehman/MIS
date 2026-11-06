import { ArrowRightIcon, CallIcon, EnvelopeIcon, MapIcon } from "@/icons";
import React from "react";
import { Link } from "react-router";
import { MotionFadeIn } from "@/components/public/Motion";

export const QuickContactSection: React.FC = () => {
  return (
    <section className="bg-white py-16 transition-colors sm:py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <MotionFadeIn
          direction="up"
          className="rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50/70 via-white to-gray-50 p-8 sm:p-12 dark:border-gray-800 dark:from-gray-800 dark:via-gray-900 dark:to-gray-900"
        >
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Left side text */}
            <MotionFadeIn direction="left" delay={0.1} className="space-y-3 lg:col-span-7">
              <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/20 dark:text-brand-300">
                Have Inquiries or Need Guidance?
              </span>
              <h2 className="font-outfit text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                Connect with our Admissions Office
              </h2>
              <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                Our staff and scholarly counselors are available to answer your questions regarding
                admissions eligibility, syllabus details, boarding facilities, and financial assistance.
              </p>

              {/* Direct channels */}
              <div className="pt-2 grid grid-cols-1 gap-3 sm:grid-cols-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300">
                  <CallIcon className="size-4.5 text-brand-500" />
                  <span className="font-mono font-medium">+92 302 9558584</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300">
                  <EnvelopeIcon className="size-4.5 text-brand-500" />
                  <span>info@madrassa-uloomeislamia.edu.pk</span>
                </div>
                <div className="flex items-center gap-2.5 text-gray-700 dark:text-gray-300 sm:col-span-2">
                  <MapIcon className="size-4.5 text-brand-500" />
                  <span>Main Campus, Near UET, Mardan &amp; Swat Branch, KP, Pakistan</span>
                </div>
              </div>
            </MotionFadeIn>

            {/* Right side CTA actions */}
            <MotionFadeIn direction="right" delay={0.2} className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-theme-xs transition-colors hover:bg-brand-600"
              >
                <span>Send Online Query</span>
                <ArrowRightIcon className="size-4 rtl:rotate-180" />
              </Link>
              <Link
                to="/admission"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-theme-xs transition-colors hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <span>Admission Process</span>
              </Link>
            </MotionFadeIn>
          </div>
        </MotionFadeIn>
      </div>
    </section>
  );
};

export default QuickContactSection;

