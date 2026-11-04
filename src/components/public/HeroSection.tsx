import { ArrowRightIcon, BoxCubeIcon, CheckCircleIcon, GroupIcon, UserIcon } from "@/icons";
import React from "react";
import { Link } from "react-router";

export const HeroSection: React.FC = () => {
  return (
    <section className="relative flex min-h-[calc(100vh-64px)] min-h-[calc(100dvh-64px)] items-center overflow-hidden bg-gray-950 py-12 sm:py-16 lg:py-0 text-white">
      {/* Background Image with optimized visibility overlay (NO negative z-index) */}
      <div
        className="absolute inset-0 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: "url('/images/hero-mosque.jpg')" }}
      >
        <img
          src="/images/hero-mosque.jpg"
          alt="Madrasa Uloom-e-Islamia Campus"
          className="size-full object-cover object-center"
        />
        {/* Balanced gradient: darker on left for text legibility, transparent on right so mosque shines through */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/60 to-gray-950/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/80 via-transparent to-black/30" />
      </div>

      {/* Main Content (relative z-10 ensures it is elevated above the background image) */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Heading, description, and CTAs (Refined & Eye-Catching) */}
          <div className="space-y-4 sm:space-y-5 text-center lg:col-span-7 lg:text-start">
            {/* Main Headline (+5px increased text size) */}
            <h1 className="font-outfit text-3xl sm:text-[44px] lg:text-[46px] xl:text-[49px] font-extrabold tracking-tight text-white leading-tight sm:leading-snug lg:leading-[1.16] drop-shadow-md">
              Excellence in{" "}
              <span className="bg-gradient-to-r from-brand-200 via-blue-light-300 to-brand-400 bg-clip-text text-transparent">
                Quranic &amp; Islamic
              </span>{" "}
              Sciences
            </h1>

            {/* Description - Authentic Islamic Seminary */}
            <p className="mx-auto max-w-xl text-sm sm:text-base leading-relaxed text-gray-200/90 lg:mx-0 drop-shadow-xs">
              Madrasa Uloom-e-Islamia is a distinguished seat of traditional Islamic sciences affiliated with{" "}
              <strong className="text-white font-semibold">Wafaq-ul-Madaris Al-Arabia Pakistan</strong>,
              dedicated exclusively to the memorization of the Holy Quran, authentic prophetic Hadith,
              classical Islamic jurisprudence (Dars-e-Nizami), and the spiritual upbringing (Tarbiyah)
              of students.
            </p>

            {/* Action Buttons (with comfortable top spacing) */}
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start pt-4 sm:pt-6">
              <Link
                to="/admission"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-theme-md transition-all hover:bg-brand-600 hover:shadow-theme-lg hover:scale-[1.02] focus:outline-hidden"
              >
                <span>Apply for Admission</span>
                <ArrowRightIcon className="size-4 rtl:rotate-180" />
              </Link>
              <Link
                to="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-black/35 px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold text-white backdrop-blur-md shadow-theme-xs transition-all hover:bg-black/55 hover:border-white/50 hover:scale-[1.02]"
              >
                <span>Explore Courses</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Floating Stat Cards */}
          <div className="lg:col-span-5">
            <div className="mx-auto max-w-xs sm:max-w-sm lg:max-w-[360px] lg:ms-auto">
              <div className="grid grid-cols-2 gap-3 sm:gap-3.5">
                {/* Stat Card 1 - Floating Slow */}
                <div className="animate-float-slow rounded-xl border border-white/25 bg-gray-950/70 p-3.5 sm:p-4 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-brand-400/60 hover:bg-gray-900/85 hover:scale-[1.03]">
                  <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-brand-500/25 text-brand-300 border border-brand-400/40 shadow-theme-xs">
                    <GroupIcon className="size-4 sm:size-4.5" />
                  </div>
                  <h3 className="mt-2 font-outfit text-xl font-extrabold text-white sm:text-2xl">
                    1,200+
                  </h3>
                  <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-gray-200">
                    Total Talaba (Students)
                  </p>
                </div>

                {/* Stat Card 2 - Floating Delayed */}
                <div className="animate-float-delayed rounded-xl border border-white/25 bg-gray-950/70 p-3.5 sm:p-4 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-success-400/60 hover:bg-gray-900/85 hover:scale-[1.03]">
                  <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-success-500/25 text-success-300 border border-success-400/40 shadow-theme-xs">
                    <UserIcon className="size-4 sm:size-4.5" />
                  </div>
                  <h3 className="mt-2 font-outfit text-xl font-extrabold text-white sm:text-2xl">
                    45+
                  </h3>
                  <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-gray-200">
                    Certified Asateeza
                  </p>
                </div>

                {/* Stat Card 3 - Floating Delayed */}
                <div className="animate-float-delayed rounded-xl border border-white/25 bg-gray-950/70 p-3.5 sm:p-4 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-orange-400/60 hover:bg-gray-900/85 hover:scale-[1.03]">
                  <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-orange-500/25 text-orange-300 border border-orange-400/40 shadow-theme-xs">
                    <BoxCubeIcon className="size-4 sm:size-4.5" />
                  </div>
                  <h3 className="mt-2 font-outfit text-xl font-extrabold text-white sm:text-2xl">
                    8 Darjat
                  </h3>
                  <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-gray-200">
                    Academic Levels
                  </p>
                </div>

                {/* Stat Card 4 - Floating Slow */}
                <div className="animate-float-slow rounded-xl border border-white/25 bg-gray-950/70 p-3.5 sm:p-4 backdrop-blur-md shadow-2xl transition-all duration-300 hover:border-blue-light-400/60 hover:bg-gray-900/85 hover:scale-[1.03]">
                  <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-blue-light-500/25 text-blue-light-300 border border-blue-light-400/40 shadow-theme-xs">
                    <CheckCircleIcon className="size-4 sm:size-4.5" />
                  </div>
                  <h3 className="mt-2 font-outfit text-xl font-extrabold text-white sm:text-2xl">
                    100%
                  </h3>
                  <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-gray-200">
                    Wafaq Exam Pass Rate
                  </p>
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
