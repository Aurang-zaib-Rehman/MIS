import PageMeta from "@/components/common/PageMeta";
import PublicPageBanner from "@/components/public/PublicPageBanner";
import BankDetailsCard from "@/components/public/BankDetailsCard";
import DonationCampaignCard, {
  type DonationCampaign,
} from "@/components/public/DonationCampaignCard";
import { CheckCircleIcon } from "@/icons";
import React, { useRef } from "react";

const campaigns: DonationCampaign[] = [
  {
    id: "student-sponsor",
    title: "Annual Talib-e-Ilm Sponsorship",
    category: "Zakat & Sadaqah",
    description:
      "Sponsor a deserving, orphan, or destitute student for an entire academic year covering boarding, nutritious meals, books, and medical care.",
    targetAmount: 1800000,
    raisedAmount: 1340000,
    donorsCount: 84,
    tag: "High Priority",
  },
  {
    id: "hifz-fund",
    title: "Hifz-ul-Quran Sustenance Fund",
    category: "Sadaqah Jariyah",
    description:
      "Support the daily educational resources, Tajweed coaching, Mus'haf copies, and awards for young children memorizing the Holy Quran.",
    targetAmount: 1200000,
    raisedAmount: 920000,
    donorsCount: 65,
    tag: "Quranic Cause",
  },
  {
    id: "mess-food",
    title: "Daily Student Meals & Matbakh Fund",
    category: "General Donations",
    description:
      "Provides two hot cooked meals daily for 500+ resident students living away from their families in pursuit of Islamic sciences.",
    targetAmount: 2500000,
    raisedAmount: 1750000,
    donorsCount: 112,
    tag: "Ongoing Needs",
  },
  {
    id: "campus-expansion",
    title: "Hostel Dormitory & Library Expansion",
    category: "Waqf / Construction",
    description:
      "Expanding residential dormitories and study halls to accommodate over 200 newly admitted students for the upcoming session.",
    targetAmount: 5000000,
    raisedAmount: 3100000,
    donorsCount: 140,
    tag: "Building Waqf",
  },
];

export const Fundraising: React.FC = () => {
  const bankDetailsRef = useRef<HTMLDivElement>(null);

  const scrollToBankDetails = () => {
    bankDetailsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <PageMeta
        title="Fundraising &amp; Donations | Madrasa Uloom-e-Islamia"
        description="Sponsor a Talib-e-Ilm, donate Zakat, or contribute to Sadaqah Jariyah projects at Madrasa Uloom-e-Islamia with 100% financial transparency."
      />

      <PublicPageBanner
        title="Fundraising &amp; Islamic Donations"
        description="Invest in your eternal Akhirah. Support deserving students of Quran and Hadith through verified Zakat and Sadaqah Jariyah."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Fundraising & Donations" },
        ]}
        backgroundImage="/images/donation_banner.jpeg"
      />

      <section className="bg-gray-50 py-16 transition-colors sm:py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Spiritual Quote Banner */}
          <div className="mb-14 rounded-3xl border border-success-200 bg-gradient-to-r from-success-50/70 via-white to-brand-50/40 p-8 text-center dark:border-gray-800 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
            <span className="rounded-full bg-success-500/15 px-3 py-1 text-xs font-semibold text-success-700 dark:text-success-400">
              The Virtue of Sadaqah Jariyah
            </span>
            <blockquote className="mt-4 font-outfit text-lg font-medium text-gray-800 sm:text-xl dark:text-gray-200">
              &ldquo;When a human being dies, their deeds come to an end, except for three:
              a continuous charity (Sadaqah Jariyah), knowledge from which benefit is derived,
              or a righteous child who prays for them.&rdquo;
            </blockquote>
            <p className="mt-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
              — Sahih Muslim 1631
            </p>
          </div>

          {/* Active Campaigns Grid */}
          <div className="mb-16">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                Active Projects &amp; Causes
              </span>
              <h2 className="mt-1 font-outfit text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                Support a Specific Initiative
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Every rupee is tracked transparently in our digital financial ledger and utilized
                strictly in compliance with Shariah guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {campaigns.map((camp) => (
                <DonationCampaignCard
                  key={camp.id}
                  campaign={camp}
                  onDonateClick={scrollToBankDetails}
                />
              ))}
            </div>
          </div>

          {/* Transparent Bank Details Section */}
          <div ref={bankDetailsRef}>
            <BankDetailsCard />
          </div>

          {/* Zakat & Shariah Compliance Notice */}
          <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
            <h4 className="font-outfit font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <CheckCircleIcon className="size-5 text-success-500" />
              <span>Zakat &amp; Financial Governance Policy</span>
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-gray-600 dark:text-gray-300">
              Madrasa Uloom-e-Islamia maintains separate ledgers for Zakat and general Sadaqat.
              Zakat funds are exclusively utilized for eligible students (Mustahiq-e-Zakat, orphans,
              and destitute Talaba) following the Tamleek verification process supervised by our
              scholarly Shariah board.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Fundraising;
