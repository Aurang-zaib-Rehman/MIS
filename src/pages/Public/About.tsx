import PageMeta from "@/components/common/PageMeta";
import PublicPageBanner from "@/components/public/PublicPageBanner";
import MohtamimDesk from "@/components/public/MohtamimDesk";
import { MotionFadeIn, MotionStaggerContainer, MotionStaggerItem } from "@/components/public/Motion";
import { CheckCircleIcon, ShootingStarIcon, StarFill } from "@/icons";
import React from "react";
import { Link } from "react-router";

export const About: React.FC = () => {
  const coreHighlights = [
    {
      title: "Verified by Wafaq-ul-Madaris",
      description:
        "Accredited and registered with Pakistan's premier Islamic seminary board with standardized curricula and recognized examinations.",
    },
    {
      title: "Scholarly Faculty & Asateeza",
      description:
        "Instructors holding authentic Sanads in Sihah-e-Sitta, Takhassus in Fiqh, and expert Sanads in Qira'at-e-Sab'a.",
    },
    {
      title: "Safe & Disciplined Boarding",
      description:
        "Full residential hostel facilities with round-the-clock supervision, prayer congregations, and healthy communal living.",
    },
    {
      title: "Digital Administration & MIS",
      description:
        "Modern computerized management ensuring punctual student attendance, term results tracking, and transparent accounts.",
    },
  ];

  const facilities = [
    {
      name: "Jamia Masjid & Prayer Hall",
      description: "Spacious central prayer hall accommodating 1,500+ worshipers for five daily prayers and Jummah sermons.",
    },
    {
      name: "Residential Hostels",
      description: "Well-ventilated, hygienic student dormitories equipped with individual storage and clean ablution areas.",
    },
    {
      name: "Nutritious Mess (Matbakh)",
      description: "Dedicated kitchen providing freshly cooked hygienic breakfast, lunch, and dinner daily for resident Talaba.",
    },
    {
      name: "Islamic Reference Library (Kutub Khana)",
      description: "Extensive collection of classical Tafseer, Hadith commentaries, Fiqh encyclopedias, and Arabic lexicons.",
    },
    {
      name: "First Aid & Health Clinic",
      description: "On-campus basic medical first aid room with regular doctor visits for the health and safety of students.",
    },
    {
      name: "Computer & Functional Literacy Lab",
      description: "Modern computer facilities introducing students to computerized research, typing, and digital literacy.",
    },
  ];

  return (
    <>
      <PageMeta
        title="About Us | Madrasa Uloom-e-Islamia"
        description="Learn about the history, mission, vision, campus facilities, and leadership of Madrasa Uloom-e-Islamia."
      />

      {/* Hero / Breadcrumb Banner */}
      <PublicPageBanner
        title="Get to Know Us - About Our Madrasa"
        description="A sanctuary of traditional Islamic sciences and moral development dedicated to serving the Ummah."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "About Us" },
        ]}
        backgroundImage="/images/about_banner.jpeg"
      />

      {/* Core Highlights Grid */}
      <section className="bg-white py-16 transition-colors dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionFadeIn direction="down" className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Institutional Pillars
            </span>
            <h2 className="mt-2 font-outfit text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
              Built Upon Decades of Sincere Service
            </h2>
          </MotionFadeIn>

          <MotionStaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {coreHighlights.map((item, idx) => (
              <MotionStaggerItem key={idx} direction="up">
                <div className="h-full rounded-2xl border border-gray-200 bg-gray-50/50 p-6 transition-all hover:bg-white hover:shadow-theme-md dark:border-gray-800 dark:bg-white/3 dark:hover:bg-gray-800/80">
                  <div className="flex size-10 items-center justify-center rounded-xl bg-brand-500 text-white mb-4">
                    <CheckCircleIcon className="size-5" />
                  </div>
                  <h3 className="font-outfit text-lg font-bold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                    {item.description}
                  </p>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStaggerContainer>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="bg-gray-50 py-16 transition-colors dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Card 1: Our Mission (glides in from left) */}
            <MotionFadeIn direction="left" className="rounded-3xl border border-gray-200 bg-white p-8 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400 mb-5">
                <ShootingStarIcon className="size-6" />
              </div>
              <h3 className="font-outfit text-2xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                To educate, inspire, and mold God-fearing individuals who are deeply grounded in
                the Holy Quran, Sunnah, and classical Islamic sciences, while possessing the integrity,
                discipline, and character required to guide contemporary society with wisdom and empathy.
              </p>
              <ul className="mt-5 space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-500"></span>
                  <span>Authentic text-based transmission of Islamic knowledge</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-500"></span>
                  <span>Uncompromised moral tarbiyah and spiritual upbringing</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-brand-500"></span>
                  <span>Equitable access for orphans and financially challenged Talaba</span>
                </li>
              </ul>
            </MotionFadeIn>

            {/* Card 2: Our Vision (glides in from right) */}
            <MotionFadeIn direction="right" className="rounded-3xl border border-gray-200 bg-white p-8 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
              <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400 mb-5">
                <StarFill className="size-6" />
              </div>
              <h3 className="font-outfit text-2xl font-bold text-gray-900 dark:text-white">
                Our Vision
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                To stand as a benchmark Islamic seminary recognized nationally for academic
                excellence, pioneering digital institutional governance, and producing scholars
                capable of addressing modern challenges through the timeless light of revelation.
              </p>
              <ul className="mt-5 space-y-2 text-xs text-gray-600 dark:text-gray-400">
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-success-500"></span>
                  <span>Harmonizing traditional scholarship with digital MIS management</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-success-500"></span>
                  <span>Producing articulate Huffaz and research-oriented Ulama</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-success-500"></span>
                  <span>Fostering unity, moderation, and compassionate communal leadership</span>
                </li>
              </ul>
            </MotionFadeIn>
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="bg-white py-16 transition-colors dark:bg-gray-900 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MotionFadeIn direction="down" className="mx-auto max-w-2xl text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Campus Infrastructure
            </span>
            <h2 className="mt-2 font-outfit text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
              Campus Facilities &amp; Boarding Life
            </h2>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Designed to support a disciplined, focused, and healthy student routine.
            </p>
          </MotionFadeIn>

          <MotionStaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((fac, idx) => (
              <MotionStaggerItem key={idx} direction="up">
                <div className="h-full rounded-2xl border border-gray-200 bg-gray-50/50 p-6 dark:border-gray-800 dark:bg-white/3">
                  <h4 className="font-outfit text-lg font-bold text-gray-900 dark:text-white">
                    {fac.name}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                    {fac.description}
                  </p>
                </div>
              </MotionStaggerItem>
            ))}
          </MotionStaggerContainer>
        </div>
      </section>

      {/* Mohtamim Desk Spotlight */}
      <section className="bg-gray-50 py-16 transition-colors dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MohtamimDesk />
        </div>
      </section>

      {/* Admission CTA Strip */}
      <section className="bg-brand-900 py-12 text-center text-white">
        <MotionFadeIn direction="up" className="mx-auto max-w-4xl px-4">
          <h3 className="font-outfit text-2xl font-bold sm:text-3xl">
            Join the Next Generation of Islamic Scholars
          </h3>
          <p className="mt-2 text-sm text-brand-100">
            Admissions for the upcoming academic session commence on 15 Shawwal.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link
              to="/admission"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-brand-950 shadow-theme-xs hover:bg-gray-100"
            >
              Apply Online Now
            </Link>
            <Link
              to="/courses"
              className="rounded-xl border border-brand-400 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800"
            >
              Explore Curriculum
            </Link>
          </div>
        </MotionFadeIn>
      </section>
    </>
  );
};

export default About;

