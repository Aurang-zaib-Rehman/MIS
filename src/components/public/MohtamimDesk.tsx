import React from "react";

export const MohtamimDesk: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white p-6 shadow-theme-sm lg:p-10 dark:border-gray-800 dark:bg-gray-900">
      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
        {/* Left Side: Photo & Identity Card */}
        <div className="text-center lg:col-span-4 lg:text-start">
          <div className="relative mx-auto size-44 overflow-hidden rounded-2xl border-4 border-brand-100 bg-gray-100 shadow-theme-md sm:size-52 lg:mx-0 dark:border-brand-900/40 dark:bg-gray-800">
            <img
              src="/images/user/muhtamim.jpeg"
              alt="Mohtamim / Principal"
              className="size-full object-cover"
            />
          </div>
          <div className="mt-4">
            <h3 className="font-outfit text-xl font-bold text-gray-900 dark:text-white">
              Hazrat Maulana Mufti Mian Saeed Akbar
            </h3>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
              Mohtamim &amp; Sheikh-ul-Hadith
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Fazil-e-Dars-e-Nizami | Takhassus fi al-Fiqh
            </p>
          </div>
        </div>

        {/* Right Side: Message from Director / Mohtamim */}
        <div className="space-y-4 lg:col-span-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
            <span>Message from the Mohtamim Desk</span>
          </div>

          <h2 className="font-outfit text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            &ldquo;Imparting Islamic Ilm with Adab, Sunnah &amp; Tarbiyah&rdquo;
          </h2>

          <div className="space-y-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
            <p>
              In the name of Allah, the Most Gracious, the Most Merciful. All praise is due to
              Allah, and blessings upon our beloved Prophet Muhammad (ﷺ), his family, and companions.
            </p>
            <p>
              At Madrasa Uloom-e-Islamia, our sacred trust is to preserve the authentic sciences of
              the Quran and Sunnah while cultivating reverence (Adab) and righteous character (Akhlaq-e-Hasana)
              in every Talib-e-Ilm. We believe that beneficial knowledge (Ilm-e-Nafe&apos;) must be accompanied
              by sincere devotion (Ikhlas), humility, and steadfast adherence to the prophetic Sunnah.
            </p>
            <p>
              Under the recognized curriculum of Wafaq-ul-Madaris Al-Arabia Pakistan, our learned Asateeza
              diligently supervise each student&apos;s daily Sabaq, Tajweed articulation, Dars-e-Nizami
              comprehension, and moral upbringing. We warmly welcome all dedicated seekers of Islamic
              knowledge to our disciplined and spiritually uplifting campus.
            </p>
          </div>

          <div className="pt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            <span>Hazrat Maulana Mufti Mian Saeed Akbar · Mohtamim &amp; Sheikh-ul-Hadith</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MohtamimDesk;

