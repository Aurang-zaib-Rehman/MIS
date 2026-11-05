import PageMeta from "@/components/common/PageMeta";
import PublicPageBanner from "@/components/public/PublicPageBanner";
import ContactForm from "@/components/public/ContactForm";
import { CallIcon, ClockIcon, EnvelopeIcon, MapIcon } from "@/icons";
import React from "react";

export const Contact: React.FC = () => {
  return (
    <>
      <PageMeta
        title="Contact Us | Madrasa Uloom-e-Islamia"
        description="Get in touch with the admissions and administrative office of Madrasa Uloom-e-Islamia. Campus location, WhatsApp assistance, and online inquiry form."
      />

      <PublicPageBanner
        title="Contact &amp; Campus Location"
        description="We are here to assist with your admission inquiries, syllabus questions, and donation confirmations."
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Contact Us" },
        ]}
        backgroundImage="/images/contact_banner.jpeg"
      />

      <section className="bg-gray-50 py-16 transition-colors sm:py-20 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            {/* Left Column: Direct Channels & Map */}
            <div className="space-y-6 lg:col-span-5">
              <div>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 dark:bg-brand-500/15 dark:text-brand-300">
                  Admissions &amp; Administration
                </span>
                <h2 className="mt-2 font-outfit text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                  Visit Our Campus or Reach Out Directly
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  Parents and prospective students are welcome to visit our peaceful campus during
                  regular office hours.
                </p>
              </div>

              {/* Contact Channels Cards */}
              <div className="space-y-4 text-sm">
                {/* Physical Location */}
                <div className="flex items-start gap-3.5 rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400">
                    <MapIcon className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-gray-900 dark:text-white">
                      Physical Campus Address
                    </h4>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                      Main Campus: Near University of Engineering &amp; Technology (UET), Mardan,
                      Khyber Pakhtunkhwa, Pakistan.
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      Sub-Branch: Swat City Campus, KP.
                    </p>
                  </div>
                </div>

                {/* Telephone & WhatsApp */}
                <div className="flex items-start gap-3.5 rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-400">
                    <CallIcon className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-gray-900 dark:text-white">
                      Phone &amp; WhatsApp Support
                    </h4>
                    <p className="mt-1 text-xs font-mono font-semibold text-gray-800 dark:text-gray-200">
                      WhatsApp: +92 302 9558584
                    </p>
                    <p className="mt-0.5 text-xs font-mono text-gray-600 dark:text-gray-400">
                      Admissions Desk: +92 301 9416781
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5 rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-light-50 text-blue-light-600 dark:bg-blue-light-500/15 dark:text-blue-light-400">
                    <EnvelopeIcon className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-gray-900 dark:text-white">
                      Email Inquiries
                    </h4>
                    <p className="mt-1 text-xs text-gray-800 dark:text-gray-200">
                      info@madrassa-uloomeislamia.edu.pk
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      admissions@madrassa-uloomeislamia.edu.pk
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-3.5 rounded-2xl border border-gray-200 bg-white p-4 shadow-theme-xs dark:border-gray-800 dark:bg-gray-900">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-600 dark:bg-orange-500/15 dark:text-orange-400">
                    <ClockIcon className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-outfit font-bold text-gray-900 dark:text-white">
                      Administrative Office Hours
                    </h4>
                    <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                      Monday to Friday: 8:00 AM – 4:00 PM
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                      Saturday &amp; Sunday: Off (Closed)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

