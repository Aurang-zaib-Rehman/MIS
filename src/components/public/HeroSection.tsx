import { ArrowRightIcon, BoxCubeIcon, CheckCircleIcon, GroupIcon, ShootingStarIcon, UserIcon } from "@/icons";
import React from "react";
import { Link } from "react-router";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-12 pb-20 dark:bg-gray-900 lg:pt-20 lg:pb-28">
      {/* Decorative gradient blobs */}
      <div className="pointer-events-none absolute -top-40 end-0 -z-1 size-96 rounded-full bg-brand-500/10 blur-3xl dark:bg-brand-500/5"></div>
      <div className="pointer-events-none absolute bottom-0 start-0 -z-1 size-80 rounded-full bg-success-500/10 blur-3xl dark:bg-success-500/5"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          {/* Left Column: Heading, description, and CTAs */}
          <div className="space-y-6 text-center lg:col-span-7 lg:text-start">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-semibold text-brand-700 dark:border-brand-800 dark:bg-brand-500/10 dark:text-brand-300">
              <span className="flex size-2 rounded-full bg-success-500 animate-pulse"></span>
              <span>Admissions Open for Session 1447–1448 AH</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-outfit text-3xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl dark:text-white">
              Excellence in{" "}
              <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                Quranic &amp; Islamic
              </span>{" "}
              Higher Education
            </h1>

            {/* Description */}
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg lg:mx-0 dark:text-gray-300">
              Madrasa Uloom-e-Islamia combines time-honored traditional Islamic scholarship
              under <strong>Wafaq-ul-Madaris Al-Arabia</strong> with a state-of-the-art
              Management Information System to provide transparent, disciplined, and nurturing
              religious education.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3.5 sm:flex-row sm:justify-center lg:justify-start">
              <Link
                to="/admission"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-3.5 text-base font-semibold text-white shadow-theme-sm transition-all hover:bg-brand-600 hover:shadow-theme-md focus:outline-hidden"
              >
                <span>Apply for Admission</span>
                <ArrowRightIcon className="size-4 rtl:rotate-180" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-base font-semibold text-gray-700 shadow-theme-xs transition-all hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                <span>Explore Courses</span>
              </Link>
            </div>

            {/* Trust highlights */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-gray-500 sm:text-sm lg:justify-start dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="size-4 text-success-500" />
                <span>Verified Curriculum</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="size-4 text-success-500" />
                <span>Residential Boarding</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="size-4 text-success-500" />
                <span>Free &amp; Subsidized Quotas</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Feature card container */}
              <div className="rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white p-6 shadow-theme-lg dark:border-gray-800 dark:from-gray-800/80 dark:to-gray-900">
                {/* Header of card */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-700">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-brand-500 text-white">
                      <ShootingStarIcon className="size-6" />
                    </div>
                    <div>
                      <h4 className="font-outfit font-bold text-gray-900 dark:text-white">
                        Institutional Overview
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Academic Year 1447–1448 AH
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-success-50 px-2.5 py-0.5 text-xs font-semibold text-success-600 dark:bg-success-500/15 dark:text-success-400">
                    Active
                  </span>
                </div>

                {/* Key stats badges grid */}
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700/60 dark:bg-gray-800/50">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                      <GroupIcon className="size-5" />
                    </div>
                    <h3 className="mt-3 font-outfit text-2xl font-bold text-gray-900 dark:text-white">
                      1,200+
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Total Talaba (Students)
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700/60 dark:bg-gray-800/50">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                      <UserIcon className="size-5" />
                    </div>
                    <h3 className="mt-3 font-outfit text-2xl font-bold text-gray-900 dark:text-white">
                      45+
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Certified Asateeza
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700/60 dark:bg-gray-800/50">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
                      <BoxCubeIcon className="size-5" />
                    </div>
                    <h3 className="mt-3 font-outfit text-2xl font-bold text-gray-900 dark:text-white">
                      8 Darjat
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Academic Levels
                    </p>
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-700/60 dark:bg-gray-800/50">
                    <div className="flex size-9 items-center justify-center rounded-lg bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-400">
                      <CheckCircleIcon className="size-5" />
                    </div>
                    <h3 className="mt-3 font-outfit text-2xl font-bold text-gray-900 dark:text-white">
                      100%
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Wafaq Exam Pass Rate
                    </p>
                  </div>
                </div>

                {/* Bottom notification strip inside card */}
                <div className="mt-5 rounded-xl bg-brand-50/70 p-3.5 text-xs text-brand-900 dark:bg-brand-950/40 dark:text-brand-200">
                  <div className="flex items-center justify-between font-medium">
                    <span>Morning Shift: 4:00 AM – 9:00 AM</span>
                    <span className="font-bold text-brand-600 dark:text-brand-400">Dars-e-Nizami</span>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-gray-600 dark:text-gray-400">
                    <span>Evening Shift: Asr to Isha</span>
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Shoba-e-Hifz</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

