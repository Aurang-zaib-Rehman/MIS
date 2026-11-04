import CourseCard, { type CourseItem } from "./CourseCard";
import { ArrowRightIcon } from "@/icons";
import React from "react";
import { Link } from "react-router";

const featuredCourses: CourseItem[] = [
  {
    id: "hifz",
    title: "Hifz-ul-Quran Al-Kareem",
    department: "Shoba-e-Hifz",
    description:
      "Complete memorization of the Holy Quran with precise Makharij, Tajweed rules, and daily revision discipline.",
    duration: "2–3 Years",
    timings: "Asr to Isha (Evening Shift)",
    badge: "Core Program",
    badgeColor: "success",
    features: [
      "Daily Sabaq, Sabaqi & Manzil tracking",
      "Dedicated Huffaz-e-Kiram supervision",
      "Bi-annual Husn-e-Qira'at competitions",
    ],
  },
  {
    id: "nazra-qaida",
    title: "Nazra & Noorani Qaida",
    department: "Shoba-e-Hifz",
    description:
      "Foundational phonetics and fluent reading of Quranic Arabic for children and beginners with authentic pronunciation.",
    duration: "12-18 Months",
    timings: "Morning & Evening Options",
    badge: "Foundational",
    badgeColor: "info",
    features: [
      "Makharij articulation training",
      "Basic Islamic etiquette & Duas",
      "Monthly recitation assessments",
    ],
  },
  {
    id: "dars-nizami-prelim",
    title: "Dars-e-Nizami: Darja Oola to Salisa",
    department: "Shoba-e-Dars-e-Nizami",
    description:
      "Comprehensive introduction to Arabic grammar (Nahw & Sarf), introductory Fiqh, and foundational Islamic jurisprudence.",
    duration: "8 Academic Years",
    timings: "4:00 AM – 9:00 AM (Morning Shift)",
    badge: "Wafaq Board",
    badgeColor: "primary",
    features: [
      "Requires Grade 8 qualification",
      "5 to 6 granular daily periods",
      "Quarterly & annual examinations",
    ],
  },
  {
    id: "daura-hadith",
    title: "Daura-e-Hadith (Darja Samina / Final Year)",
    department: "Shoba-e-Hadith",
    description:
      "Final graduate degree encompassing in-depth analysis of Sihah-e-Sitta (Bukhari, Muslim, Tirmidhi, Abu Dawood, Nasai, Ibn Majah).",
    duration: "1 Year (Master's Level)",
    timings: "Full Day Academic Timetable",
    badge: "Shahadat-ul-Almiya",
    badgeColor: "warning",
    features: [
      "Direct Sanad by renowned Sheikh-ul-Hadith",
      "Wafaq-ul-Madaris standardized final exams",
      "Official HEC Recognized Master's Equivalence",
    ],
  },
];

interface CoursesSectionProps {
  limit?: number;
  showViewAll?: boolean;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  limit,
  showViewAll = true,
}) => {
  const displayedCourses = limit
    ? featuredCourses.slice(0, limit)
    : featuredCourses;

  return (
    <section className="border-y border-gray-200 bg-gray-100 py-16 transition-colors sm:py-20 dark:border-gray-800 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-600 dark:bg-brand-500/15 dark:text-brand-300">
            Authentic Islamic Curriculum
          </span>
          <h2 className="mt-2 font-outfit text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
            Academic &amp; Religious Programs
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-300">
            Structured in rigorous accordance with Wafaq-ul-Madaris Al-Arabia Pakistan,
            offering sequential Quranic and traditional Dars-e-Nizami pathways.
          </p>
        </div>

        {/* Courses Cards Grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {displayedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Bottom CTA */}
        {showViewAll && (
          <div className="mt-12 text-center">
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              <span>View All Department Levels &amp; Syllabi</span>
              <ArrowRightIcon className="size-4 rtl:rotate-180" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default CoursesSection;
