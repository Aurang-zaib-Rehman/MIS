import PageMeta from "@/components/common/PageMeta";
import CoursesSection from "@/components/public/CoursesSection";
import HeroSection from "@/components/public/HeroSection";
import MohtamimDesk from "@/components/public/MohtamimDesk";
import QuickContactSection from "@/components/public/QuickContactSection";
import TestimonialsSection from "@/components/public/TestimonialsSection";
import WhyChooseUsSection from "@/components/public/WhyChooseUsSection";
import { MotionFadeIn } from "@/components/public/Motion";
import { ArrowRightIcon, CheckCircleIcon, DollarLineIcon } from "@/icons";
import React from "react";
import { Link } from "react-router";

export const Home: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Madrasa Uloom-e-Islamia | Official Web Portal &amp; MIS"
        description="Official Web Portal of Madrasa Uloom-e-Islamia. Providing authentic Quranic Hifz and Dars-e-Nizami Islamic higher education under Wafaq-ul-Madaris Al-Arabia Pakistan."
      />

      {/* Hero Section */}
      <HeroSection />

      {/* Madrassa Introduction Banner */}
      <section className="border-y border-gray-200 bg-white py-12 transition-colors dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionFadeIn direction="up" duration={0.6}>
            <div className="mx-auto max-w-3xl text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                About the Institution
              </span>
              <h2 className="mt-2 font-outfit text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                An Islamic Center of Scholarly Heritage &amp; Spiritual Upbringing
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
                Established with the noble mission of preserving and propagating authentic Islamic sciences,
                Madrasa Uloom-e-Islamia is a registered, distinguished affiliate of Wafaq-ul-Madaris
                Al-Arabia Pakistan. We provide continuous academic pathways ranging from foundational
                Noorani Qaida to the comprehensive 8-year Dars-e-Nizami (Shahadat-ul-Almiya).
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  <span>Read Full History &amp; Mission</span>
                  <ArrowRightIcon className="size-4 rtl:rotate-180" />
                </Link>
              </div>
            </div>
          </MotionFadeIn>
        </div>
      </section>

      {/* Featured Courses Overview */}
      <CoursesSection limit={4} showViewAll={true} />

      {/* Why Choose Us */}
      <WhyChooseUsSection />

      {/* Mohtamim / Director Desk Highlight */}
      <section className="border-y border-gray-200 bg-gray-100 py-16 transition-colors sm:py-20 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionFadeIn direction="down" duration={0.6}>
            <div className="mb-10 text-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Institutional Leadership
              </span>
              <h2 className="mt-1 font-outfit text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                Leadership &amp; Faculty Spotlight
              </h2>
            </div>
          </MotionFadeIn>
          <MohtamimDesk />
          <MotionFadeIn direction="up" delay={0.2}>
            <div className="mt-8 text-center">
              <Link
                to="/teachers"
                className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-theme-xs hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                <span>Meet All Department Faculty &amp; Asateeza</span>
                <ArrowRightIcon className="size-4 rtl:rotate-180" />
              </Link>
            </div>
          </MotionFadeIn>
        </div>
      </section>

      {/* Admission Callout Section */}
      <section className="border-y border-gray-200 bg-white py-16 transition-colors dark:border-gray-800 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionFadeIn direction="up" duration={0.65}>
            <div className="relative overflow-hidden rounded-3xl border border-brand-400/40 bg-gradient-to-r from-brand-800 via-brand-700 to-brand-800 p-8 text-white shadow-2xl shadow-brand-950/30 sm:p-12">
              {/* Ambient inner soft glow */}
              <div className="pointer-events-none absolute -end-16 -top-16 size-72 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute -start-10 -bottom-10 size-60 rounded-full bg-brand-500/20 blur-2xl" />

              <div className="relative z-1 max-w-2xl space-y-4">
                <span className="rounded-full bg-brand-500/30 px-3 py-1 text-xs font-semibold text-brand-200 border border-brand-400/30">
                  Admissions Session 1447–1448 AH
                </span>
                <h2 className="font-outfit text-2xl font-bold tracking-tight sm:text-4xl">
                  Ready to Join Madrasa Uloom-e-Islamia?
                </h2>
                <p className="text-sm leading-relaxed text-brand-100 sm:text-base">
                  New admissions commence on <strong>15 Shawwal</strong>. Applications are invited
                  for Shoba-e-Hifz and Dars-e-Nizami (Darja Oola to Darja Samina). Residential boarding
                  and full scholarships are available for deserving students.
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <Link
                    to="/admission"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-950 shadow-theme-xs hover:bg-gray-100"
                  >
                    <span>Online Admission Form</span>
                    <ArrowRightIcon className="size-4 rtl:rotate-180" />
                  </Link>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 rounded-xl border border-brand-400/50 bg-brand-500/20 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-500/30"
                  >
                    <span>Contact Admission Desk</span>
                  </Link>
                </div>
              </div>
            </div>
          </MotionFadeIn>
        </div>
      </section>

      {/* Fundraising & Donations Teaser */}
      <section className="bg-gray-50 py-16 transition-colors dark:bg-gray-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-8">
              <MotionFadeIn direction="left" duration={0.6}>
                <span className="rounded-full bg-success-50 px-3 py-1 text-xs font-semibold text-success-600 dark:bg-success-500/15 dark:text-success-400">
                  Sadaqah Jariyah &amp; Zakat Fund
                </span>
                <h2 className="mt-2 font-outfit text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                  Support Underprivileged Seekers of Quranic Knowledge
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  Over 60% of our enrolled Talaba receive full boarding, meals, and academic books
                  free of charge through your Zakat and generous community contributions. Invest in your
                  eternal reward.
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-3 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircleIcon className="size-4 text-success-500" />
                    <span>100% Shariah Compliant Zakat</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircleIcon className="size-4 text-success-500" />
                    <span>Annual Financial Audit</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircleIcon className="size-4 text-success-500" />
                    <span>Direct Bank Transfers</span>
                  </div>
                </div>
              </MotionFadeIn>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-4 lg:items-end">
              <MotionFadeIn direction="right" delay={0.15} duration={0.6}>
                <Link
                  to="/fundraising"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-success-500 px-6 py-3.5 text-sm font-semibold text-white shadow-theme-xs hover:bg-success-600"
                >
                  <DollarLineIcon className="size-5" />
                  <span>View Donation Campaigns</span>
                </Link>
              </MotionFadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* Quick Contact Strip */}
      <QuickContactSection />
    </>
  );
};

export default Home;

