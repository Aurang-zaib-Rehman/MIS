import PageMeta from "@/components/common/PageMeta";
import PublicPageBanner from "@/components/public/PublicPageBanner";
import AdmissionInquiryForm from "@/components/public/AdmissionInquiryForm";
import { MotionFadeIn, MotionStaggerContainer, MotionStaggerItem } from "@/components/public/Motion";
import { CheckCircleIcon, CalenderIcon } from "@/icons";
import React from "react";

export const Admission: React.FC = () => {
  const steps = [
    {
      num: "01",
      title: "Submit Online or In-Person Form",
      desc: "Complete the preliminary admission form with student B-Form, guardian contact, and desired Darja/course.",
    },
    {
      num: "02",
      title: "Document Verification & Oral Test",
      desc: "Report to the admissions desk on 15 Shawwal for document verification and Tajweed/Nazra oral evaluation.",
    },
    {
      num: "03",
      title: "Official Sanction & Darja Assignment",
      desc: "The Admissions Committee confirms eligibility and issues the formal Roll Number and Student MIS ID.",
    },
    {
      num: "04",
      title: "Hostel Allotment & Class Commencement",
      desc: "Residential Talaba receive hostel room, mess card, and class timetable. Regular lectures begin immediately.",
    },
  ];

  const eligibilityCriteria = [
    {
      darja: "Department of Quranic Studies (Hifz & Nazra)",
      requirements: [
        "Age between 7 to 14 years for full-time Hifz program.",
        "Basic ability to read Arabic letters or Noorani Qaida (for Nazra).",
        "Student B-Form copy and Father/Guardian CNIC copy.",
        "Commitment to daily evening shift (Asr to Isha).",
      ],
    },
    {
      darja: "Dars-e-Nizami: Darja Oola (Year 1)",
      requirements: [
        "Mandatory Middle (Grade 8) Pass School Certificate from recognized educational board.",
        "Clear phonetics and basic Arabic comprehension.",
        "Original Character Certificate from previous institution.",
        "4 recent passport-size photographs with blue background.",
      ],
    },
    {
      darja: "Dars-e-Nizami: Higher Darjat (Saniya to Samina)",
      requirements: [
        "Official Passing DMC / Sanad of previous Darja from Wafaq-ul-Madaris Al-Arabia.",
        "Minimum 240/600 aggregate marks in the preceding board examination.",
        "Formal Clearance / Leaving Certificate (Dakhila Kharij) from previous seminary.",
        "In-person interview with the Departmental Head.",
      ],
    },
  ];

  return (
    <>
      <PageMeta
        title="Admissions &amp; Application Guidelines | Madrasa Uloom-e-Islamia"
        description="Comprehensive admission guidelines, eligibility criteria, required documents, and online application form for Madrasa Uloom-e-Islamia."
      />

      <PublicPageBanner
        title="Admissions &amp; Application Process"
        description="Step-by-step admissions policy, eligibility criteria, and digital application form for Academic Session 1447–1448 AH."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Admissions" },
        ]}
        backgroundImage="/images/admission_banner.jpeg"
      />

      <section className="bg-gray-50 py-16 transition-colors sm:py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Key Dates Banner */}
          <MotionFadeIn direction="up" className="mb-12 rounded-2xl border border-brand-200 bg-brand-50/80 p-5 dark:border-brand-900/50 dark:bg-brand-950/40 sm:p-6">
            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex size-11 items-center justify-center rounded-xl bg-brand-500 text-white">
                  <CalenderIcon className="size-6" />
                </div>
                <div>
                  <h4 className="font-outfit font-bold text-gray-900 dark:text-white">
                    Annual Academic Session Dates
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    Admissions Open: <strong>15 Shawwal-ul-Mukarram</strong> · Classes End: <strong>End of Rajab</strong>
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-success-500 px-3.5 py-1 text-xs font-semibold text-white shadow-theme-xs">
                Registration Active
              </span>
            </div>
          </MotionFadeIn>

          {/* Admission Steps */}
          <div className="mb-16">
            <MotionFadeIn direction="down" className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Simple 4-Step Pathway
              </span>
              <h2 className="mt-1 font-outfit text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                How to Complete Your Admission
              </h2>
            </MotionFadeIn>

            <MotionStaggerContainer className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((st) => (
                <MotionStaggerItem key={st.num} direction="up">
                  <div className="h-full relative rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs transition-all hover:border-brand-300 dark:border-gray-800 dark:bg-gray-900">
                    <span className="font-outfit text-3xl font-extrabold text-brand-500/20 dark:text-brand-400/20">
                      {st.num}
                    </span>
                    <h3 className="mt-2 font-outfit text-lg font-bold text-gray-900 dark:text-white">
                      {st.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-400">
                      {st.desc}
                    </p>
                  </div>
                </MotionStaggerItem>
              ))}
            </MotionStaggerContainer>
          </div>

          {/* Eligibility Requirements Cards */}
          <div className="mb-16">
            <MotionFadeIn direction="down" className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Departmental Guidelines
              </span>
              <h2 className="mt-1 font-outfit text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                Eligibility Criteria &amp; Documentation
              </h2>
            </MotionFadeIn>

            <MotionStaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {eligibilityCriteria.map((item, idx) => (
                <MotionStaggerItem key={idx} direction="up">
                  <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
                    <h4 className="font-outfit text-base font-bold text-gray-900 dark:text-white">
                      {item.darja}
                    </h4>
                    <ul className="mt-4 space-y-2 text-xs text-gray-600 dark:text-gray-300">
                      {item.requirements.map((req, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircleIcon className="size-4 shrink-0 mt-0.5 text-brand-500" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionStaggerItem>
              ))}
            </MotionStaggerContainer>
          </div>

          {/* Admission Form Section */}
          <MotionFadeIn direction="up" delay={0.2} className="mx-auto max-w-4xl">
            <AdmissionInquiryForm />
          </MotionFadeIn>
        </div>
      </section>
    </>
  );
};

export default Admission;
