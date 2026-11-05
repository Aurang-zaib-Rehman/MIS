import PageMeta from "@/components/common/PageMeta";
import PublicPageBanner from "@/components/public/PublicPageBanner";
import MohtamimDesk from "@/components/public/MohtamimDesk";
import TeacherCard, { type TeacherProfile } from "@/components/public/TeacherCard";
import React, { useState } from "react";

const facultyList: TeacherProfile[] = [
  // Hadith & Higher Islamic Studies
  {
    id: "t1",
    name: "Hazrat Maulana Mufti Mian Saeed Akbar",
    designation: "Mohtamim & Sheikh-ul-Hadith",
    department: "Shoba-e-Hadith & Fiqh",
    qualification: "Shahadat-ul-Almiya, Takhassus fi al-Ifta",
    specialty: "Sahih al-Bukhari, Islamic Jurisprudence & Fatwa",
    image: "/images/user/muhtamim.jpeg",
    experienceYears: 28,
  },
  {
    id: "t2",
    name: "Maulana Qazi Sufi Ali Ahmad",
    designation: "Senior Professor of Hadith & Arabic",
    department: "Shoba-e-Hadith",
    qualification: "Shahadat-ul-Almiya, M.A Islamic Studies",
    specialty: "Sahih Muslim, Sunan at-Tirmidhi, Usul-ul-Hadith",
    image: "/images/user/staff.jpeg",
    experienceYears: 20,
  },
  {
    id: "t3",
    name: "Mufti Muhammad Haseeb Khan",
    designation: "Head of Dars-e-Nizami & Lecturer in Fiqh",
    department: "Shoba-e-Dars-e-Nizami",
    qualification: "Shahadat-ul-Almiya, Dar-ul-Ifta Sanad",
    specialty: "Al-Hidaya, Usul-ush-Shashi, Arabic Balaghat",
    image: "/images/user/staff.jpeg",
    experienceYears: 14,
  },
  {
    id: "t4",
    name: "Maulana Aurang Zaib Rehman",
    designation: "Senior Instructor of Arabic Grammar",
    department: "Shoba-e-Dars-e-Nizami",
    qualification: "Shahadat-ul-Almiya (Wafaq Gold Medalist)",
    specialty: "Ilm-us-Sarf, Kafiyah, Maqamat-e-Hariri",
    image: "/images/user/staff.jpeg",
    experienceYears: 11,
  },

  // Department of Quranic Studies (Hifz & Tajweed)
  {
    id: "t5",
    name: "Qari Muhammad Usman Al-Azhari",
    designation: "Chief Qari & Head of Tajweed",
    department: "Shoba-e-Hifz & Tajweed",
    qualification: "Qira'at-e-Sab'a Sanad, Hafiz-ul-Quran",
    specialty: "Shatibiyyah, Jazariyyah, Advanced Makharij Articulation",
    image: "/images/user/staff.jpeg",
    experienceYears: 18,
  },
  {
    id: "t6",
    name: "Qari Noor-ul-Haq",
    designation: "Senior Hifz Ustadh",
    department: "Shoba-e-Hifz",
    qualification: "Hafiz-ul-Quran, Shahadah fi Tajweed",
    specialty: "Sabaq & Manzil Memorization Discipline",
    image: "/images/user/staff.jpeg",
    experienceYears: 15,
  },
  {
    id: "t7",
    name: "Hafiz Bilal Ahmad",
    designation: "Nazra & Noorani Qaida Instructor",
    department: "Shoba-e-Hifz",
    qualification: "Hafiz-ul-Quran, Sanad Tajweed",
    specialty: "Foundational Phonetics & Child Pedagogy",
    image: "/images/user/staff.jpeg",
    experienceYears: 9,
  },
  {
    id: "t8",
    name: "Maulana Qamar khan",
    designation: "Lecturer in Arabic Syntax & Islamic History",
    department: "Shoba-e-Dars-e-Nizami",
    qualification: "Shahadat-ul-Almiya, BS Computer Science",
    specialty: "Seerat-un-Nabi, Islamic History & Digital Records",
    image: "/images/user/staff.jpeg",
    experienceYears: 8,
  },
];

export const Teachers: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>("all");

  const filteredTeachers =
    selectedDept === "all"
      ? facultyList
      : facultyList.filter((t) =>
        selectedDept === "hifz"
          ? t.department.includes("Hifz")
          : t.department.includes("Hadith") || t.department.includes("Nizami")
      );

  return (
    <>
      <PageMeta
        title="Teachers &amp; Faculty | Madrasa Uloom-e-Islamia"
        description="Meet the esteemed Asateeza-e-Kiram, Huffaz, and Muftis of Madrasa Uloom-e-Islamia, certified by Wafaq-ul-Madaris Al-Arabia Pakistan."
      />

      <PublicPageBanner
        title="Our Esteemed Faculty &amp; Asateeza"
        description="Learned scholars and dedicated Huffaz guiding the next generation with authentic knowledge and righteous character."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Teachers & Faculty" },
        ]}
        backgroundImage="/images/teachers_banner.jpeg"
      />

      {/* Mohtamim Spotlight */}
      <section className="bg-white py-16 transition-colors dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <MohtamimDesk />
        </div>
      </section>

      {/* Faculty Directory */}
      <section className="bg-gray-50 py-16 transition-colors sm:py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Departmental Faculty
            </span>
            <h2 className="mt-2 font-outfit text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
              Scholars of the Quran &amp; Sunnah
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Every instructor undergoes strict academic verification and possesses recognized Wafaq
              credentials before assuming teaching duties.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            <button
              onClick={() => setSelectedDept("all")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${selectedDept === "all"
                  ? "bg-brand-500 text-white shadow-theme-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              All Faculty ({facultyList.length})
            </button>
            <button
              onClick={() => setSelectedDept("nizami")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${selectedDept === "nizami"
                  ? "bg-brand-500 text-white shadow-theme-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              Hadith &amp; Dars-e-Nizami Faculty
            </button>
            <button
              onClick={() => setSelectedDept("hifz")}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all ${selectedDept === "hifz"
                  ? "bg-brand-500 text-white shadow-theme-xs"
                  : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              Hifz &amp; Tajweed Asateeza
            </button>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredTeachers.map((teacher) => (
              <TeacherCard key={teacher.id} teacher={teacher} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Teachers;
