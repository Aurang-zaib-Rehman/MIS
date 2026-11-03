import PageMeta from "@/components/common/PageMeta";
import PublicPageBanner from "@/components/public/PublicPageBanner";
import CourseCard, { type CourseItem } from "@/components/public/CourseCard";
import React, { useState } from "react";
import { Link } from "react-router";

const allCourses: CourseItem[] = [
  // Shoba-e-Hifz
  {
    id: "hifz-full",
    title: "Hifz-ul-Quran Al-Kareem",
    department: "Department of Quranic Studies",
    description:
      "Complete memorization of all 30 Paras of the Holy Quran under senior Huffaz. Daily strict protocol of Sabaq (new lesson), Sabaqi (recent lessons), and Manzil (repetition).",
    duration: "2 to 3 Years",
    timings: "Asr to Isha (Evening Shift)",
    badge: "Core Quranic",
    badgeColor: "success",
    features: [
      "Individualized pace & daily listening",
      "Correct Makharij & Tajweed rules",
      "Regular public revision testing",
      "Annual Taraweeh leading preparation",
    ],
  },
  {
    id: "nazra-quran",
    title: "Nazra Quran with Tajweed",
    department: "Department of Quranic Studies",
    description:
      "Fluent reading of the entire Quran directly from the Mus'haf with precise application of Tajweed rules (Ghunnah, Ikhfa, Idgham, Qalqalah).",
    duration: "6 to 12 Months",
    timings: "Morning & Evening Options",
    badge: "Foundational",
    badgeColor: "info",
    features: [
      "Rigorous Makharij articulation",
      "Tarteel & Waqf punctuation signs",
      "Basic Faraiz of Salah & daily Duas",
    ],
  },
  {
    id: "qaida-phonetics",
    title: "Noorani Qaida & Phonetics",
    department: "Department of Quranic Studies",
    description:
      "Elementary reading course for beginners and young children, instilling accurate letter identification and basic Arabic vowel rules.",
    duration: "3 to 6 Months",
    timings: "Flexible Morning/Evening",
    badge: "Beginner Level",
    badgeColor: "primary",
    features: [
      "Letter recognition & compound letters",
      "Tanween, Sukoon, and Tashdeed",
      "Short Surahs memorization",
    ],
  },
  {
    id: "tarjuma-tafseer",
    title: "Tarjuma & Tafseer-e-Quran",
    department: "Department of Quranic Studies",
    description:
      "Detailed word-for-word translation and authentic classical commentary (Tafseer) of selected Quranic Surahs and Paras.",
    duration: "1 Year",
    timings: "Post-Fajr or Post-Asr",
    badge: "Comprehension",
    badgeColor: "warning",
    features: [
      "Asbab-al-Nuzul (Occasions of Revelation)",
      "Basic Quranic Arabic vocabulary",
      "Contemporary thematic lessons",
    ],
  },

  // Shoba-e-Dars-e-Nizami
  {
    id: "darja-oola",
    title: "Darja Oola (Year 1 - Dars-e-Nizami)",
    department: "Department of Islamic Studies",
    description:
      "First academic year of the traditional 8-year Alim course. Focuses on foundational Arabic morphology (Sarf), basic syntax (Nahw), and introductory Fiqh.",
    duration: "1 Academic Year",
    timings: "4:00 AM – 9:00 AM (Morning Shift)",
    badge: "Eligibility: Grade 8",
    badgeColor: "primary",
    features: [
      "5 granular classes/periods daily",
      "Ilm-us-Sarf & Ilm-un-Nahw fundamentals",
      "Introductory Hanafi jurisprudence (Noor-ul-Idah)",
      "Internal semester evaluations",
    ],
  },
  {
    id: "darja-saniya",
    title: "Darja Saniya (Year 2 - Dars-e-Nizami)",
    department: "Department of Islamic Studies",
    description:
      "Second year of Dars-e-Nizami. Administered directly under the Wafaq-ul-Madaris Al-Arabia board with formal external board examinations.",
    duration: "1 Academic Year",
    timings: "4:00 AM – 9:00 AM (Morning Shift)",
    badge: "Wafaq Board",
    badgeColor: "success",
    features: [
      "6 periods daily schedule",
      "Advanced Arabic syntax (Kafiyah, Sharh Miat Amil)",
      "Intermediate Fiqh (Qudoori)",
      "Minimum 240/600 passing marks rule",
    ],
  },
  {
    id: "darja-salisa-rabia",
    title: "Darja Salisa & Rabia (Years 3 & 4)",
    department: "Department of Islamic Studies",
    description:
      "Intermediate level dealing with Arabic literature (Maqamat Hariri), advanced Fiqh (Kanz-ud-Daqaiq, Hidaya Vol 1), and Principles of Jurisprudence (Usul-ush-Shashi).",
    duration: "2 Academic Years",
    timings: "4:00 AM – 9:00 AM (Morning Shift)",
    badge: "Sanaviyya Khassa",
    badgeColor: "primary",
    features: [
      "6 to 7 periods daily",
      "Mantiq (Logic) & Balaghat (Rhetoric)",
      "Comparative Fiqh analysis",
      "Wafaq-ul-Madaris external boards",
    ],
  },
  {
    id: "darja-khamisa-sadisa",
    title: "Darja Khamisa & Sadisa (Years 5 & 6)",
    department: "Department of Islamic Studies",
    description:
      "Higher seminary studies encompassing deep Usul-ul-Fiqh (Noor-ul-Anwar), advanced Hidaya (Vols 2 & 3), Tafseer Jalalayn, and introductory Hadith studies (Mishkat-ul-Masabih).",
    duration: "2 Academic Years",
    timings: "Full Day Timetable",
    badge: "Aliya Level",
    badgeColor: "primary",
    features: [
      "7 periods daily schedule",
      "Jalalayn commentary and Usul-ul-Hadith",
      "Tahawi & comparative rulings",
      "Bachelor's degree equivalence track",
    ],
  },
  {
    id: "daura-hadith-master",
    title: "Daura-e-Hadith / Darja Samina (Year 8)",
    department: "Department of Islamic Studies",
    description:
      "The pinnacle of classical Islamic education (Shahadat-ul-Almiya). Exhaustive study and continuous Sanad transmission of the Six Authentic Hadith Compilations (Sihah-e-Sitta).",
    duration: "1 Final Academic Year",
    timings: "Special Lecture Timetable",
    badge: "Shahadat-ul-Almiya (M.A Equivalent)",
    badgeColor: "warning",
    features: [
      "Sahih al-Bukhari & Sahih Muslim full study",
      "Sunan Abu Dawood, Tirmidhi, Nasai, Ibn Majah",
      "Direct Ijazah and Sanad from Sheikh-ul-Hadith",
      "Official HEC recognized Master's in Islamic Studies equivalence",
    ],
  },
];

export const Courses: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>("all");

  const filteredCourses =
    selectedDept === "all"
      ? allCourses
      : allCourses.filter((c) =>
          selectedDept === "hifz"
            ? c.department.includes("Quranic")
            : c.department.includes("Islamic")
        );

  return (
    <>
      <PageMeta
        title="Courses &amp; Academic Programs | Madrasa Uloom-e-Islamia"
        description="Comprehensive curriculum overview of Shoba-e-Hifz (Quranic Studies) and the 8-year Dars-e-Nizami Alim course under Wafaq-ul-Madaris Al-Arabia Pakistan."
      />

      <PublicPageBanner
        title="Courses &amp; Academic Programs"
        description="Structured, accredited curricula spanning Quran memorization, Arabic syntax, Islamic jurisprudence, and the prestigious Daura-e-Hadith."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Courses" },
        ]}
      />

      <section className="bg-gray-50 py-16 transition-colors sm:py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Department Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            <button
              onClick={() => setSelectedDept("all")}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                selectedDept === "all"
                  ? "bg-brand-500 text-white shadow-theme-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              All Academic Programs ({allCourses.length})
            </button>
            <button
              onClick={() => setSelectedDept("hifz")}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                selectedDept === "hifz"
                  ? "bg-brand-500 text-white shadow-theme-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              Shoba-e-Hifz &amp; Quranic Studies
            </button>
            <button
              onClick={() => setSelectedDept("nizami")}
              className={`rounded-xl px-5 py-2.5 text-sm font-semibold transition-all ${
                selectedDept === "nizami"
                  ? "bg-brand-500 text-white shadow-theme-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              Shoba-e-Dars-e-Nizami (8 Darjat)
            </button>
          </div>

          {/* Courses Catalog Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          {/* Admission Callout Footer */}
          <div className="mt-16 rounded-3xl border border-brand-200 bg-white p-8 text-center shadow-theme-sm dark:border-gray-800 dark:bg-gray-900">
            <h3 className="font-outfit text-2xl font-bold text-gray-900 dark:text-white">
              Ready to Begin Your Islamic Academic Journey?
            </h3>
            <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
              Admissions for the upcoming academic year are accepted online and in-person. Submit
              your preliminary admission application today to book your interview slot.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                to="/admission"
                className="rounded-xl bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-theme-xs hover:bg-brand-600"
              >
                Apply for Admission Online
              </Link>
              <Link
                to="/contact"
                className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
              >
                Inquire about Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Courses;
