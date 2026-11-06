import { StarFill } from "@/icons";
import React from "react";
import { MotionFadeIn, MotionStaggerContainer, MotionStaggerItem } from "./Motion";

interface TestimonialItem {
  name: string;
  role: string;
  feedback: string;
  rating: number;
}

const testimonials: TestimonialItem[] = [
  {
    name: "Haji Muhammad Saeed",
    role: "Parent of Hifz Graduate",
    feedback:
      "Alhamdulillah, my son completed his Hifz-ul-Quran in just two and a half years with impeccable Tajweed. The Asateeza's daily attention and the digital progress updates kept us informed at every step.",
    rating: 5,
  },
  {
    name: "Maulana Abdul Basit",
    role: "Alumnus (Daura-e-Hadith, 2024)",
    feedback:
      "The academic rigor and spiritual environment at Madrasa Uloom-e-Islamia are exceptional. The Asateeza not only teach the books of Hadith with profound insight but also train students in moral conduct and leadership.",
    rating: 5,
  },
  {
    name: "Muhammad Tariq Khan",
    role: "Parent of Darja Oola Student",
    feedback:
      "The hostel cleanliness, disciplined routine, and care taken for students' nutrition and well-being exceeded our expectations. Having computerized fee slips and attendance records is very reassuring.",
    rating: 5,
  },
];

export const TestimonialsSection: React.FC = () => {
  return (
    <section className="bg-gray-50 py-16 transition-colors sm:py-20 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <MotionFadeIn direction="down" duration={0.6}>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Community Trust
            </span>
            <h2 className="mt-2 font-outfit text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
              What Parents &amp; Students Say
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base dark:text-gray-400">
              Real experiences from families and graduates who have experienced our nurturing,
              disciplined, and faithful Islamic learning environment.
            </p>
          </div>
        </MotionFadeIn>

        {/* Testimonials Cards Grid */}
        <MotionStaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((item, idx) => (
            <MotionStaggerItem key={idx} direction="up" distance={25}>
              <div
                className="flex flex-col justify-between rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs transition-all hover:shadow-theme-md dark:border-gray-800 dark:bg-gray-900 h-full"
              >
                <div>
                  {/* 5-Star Rating */}
                  <div className="flex items-center gap-1 text-warning-500 mb-4">
                    {Array.from({ length: item.rating }).map((_, sIdx) => (
                      <StarFill key={sIdx} className="size-4.5 fill-current" />
                    ))}
                  </div>

                  {/* Feedback Quote */}
                  <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 italic">
                    &ldquo;{item.feedback}&rdquo;
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand-100 font-bold text-brand-700 dark:bg-brand-900/50 dark:text-brand-300">
                    {item.name[0]}
                  </div>
                  <div>
                    <h4 className="font-outfit text-sm font-bold text-gray-900 dark:text-white">
                      {item.name}
                    </h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {item.role}
                    </p>
                  </div>
                </div>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStaggerContainer>
      </div>
    </section>
  );
};

export default TestimonialsSection;

