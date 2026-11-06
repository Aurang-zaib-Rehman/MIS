import { BoxCubeIcon, CheckCircleIcon, ClockIcon, DollarLineIcon, UserIcon } from "@/icons";
import React from "react";
import { MotionFadeIn, MotionStaggerContainer, MotionStaggerItem } from "./Motion";

interface FeatureItem {
  title: string;
  description: string;
  icon: React.ReactNode;
  badge: string;
}

const features: FeatureItem[] = [
  {
    title: "Qualified & Certified Asateeza",
    description:
      "Learned scholars and experienced Huffaz holding authentic Sanads from Wafaq-ul-Madaris, dedicated to student character building.",
    icon: <UserIcon className="size-6 text-brand-500" />,
    badge: "Expert Faculty",
  },
  {
    title: "Safe & Moral Environment",
    description:
      "Disciplined residential boarding facilities, hygienic mess meals, 24/7 warden supervision, and a peaceful spiritual atmosphere.",
    icon: <CheckCircleIcon className="size-6 text-success-500" />,
    badge: "Residential Care",
  },
  {
    title: "Affordable & Zakat-Backed Fees",
    description:
      "Nominal fee model with 100% full-ride scholarships, free lodging, and book sponsorships for eligible orphans and deserving students.",
    icon: <DollarLineIcon className="size-6 text-orange-500" />,
    badge: "Full Concessions",
  },
  {
    title: "Flexible Shift Scheduling",
    description:
      "Distinct operational shifts: 4:00 AM – 9:00 AM for Dars-e-Nizami and Asr to Isha for Hifz, allowing students balanced routine.",
    icon: <ClockIcon className="size-6 text-blue-light-500" />,
    badge: "2 Shifts Daily",
  },
  {
    title: "Digital MIS & Progress Tracking",
    description:
      "Automated attendance, period-level logging, and computerized term report cards giving parents transparent insights into progress.",
    icon: <BoxCubeIcon className="size-6 text-brand-600" />,
    badge: "Modern MIS",
  },
  {
    title: "Bi-Annual Competitions & Tarbiyah",
    description:
      "Twice-yearly student competitions in Husn-e-Qira'at, Naat, Taqreer (speeches), Masnoon Duas, and Faraiz of Salah and Ghusl.",
    icon: <CheckCircleIcon className="size-6 text-success-600" />,
    badge: "Holistic Tarbiyah",
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="bg-white py-16 transition-colors sm:py-20 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <MotionFadeIn direction="down" duration={0.6}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Why Choose Madrasa Uloom-e-Islamia
            </span>
            <h2 className="mt-2 font-outfit text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
              Nurturing Knowledge, Character &amp; Faith
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
              We provide a holistic educational ecosystem where authentic Islamic sciences
              are imparted in an organized, modern, and morally uplifting atmosphere.
            </p>
          </div>
        </MotionFadeIn>

        {/* Features Grid */}
        <MotionStaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((item, idx) => (
            <MotionStaggerItem key={idx} direction="up" distance={25}>
              <div
                className="group relative rounded-2xl border border-gray-200 bg-gray-50/50 p-6 transition-all hover:border-brand-300 hover:bg-white hover:shadow-theme-md dark:border-gray-800 dark:bg-white/3 dark:hover:border-brand-700 dark:hover:bg-gray-800/80"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-white shadow-theme-xs transition-transform group-hover:scale-110 dark:bg-gray-800">
                    {item.icon}
                  </div>
                  <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                    {item.badge}
                  </span>
                </div>
                <h3 className="font-outfit text-lg font-bold text-gray-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
