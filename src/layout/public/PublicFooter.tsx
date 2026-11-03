import { EnvelopeIcon, MapIcon } from "@/icons";
import React from "react";
import { Link } from "react-router";

export const PublicFooter: React.FC = () => {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-600 transition-colors dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
      {/* Main Footer Container */}
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Column 1: Brand & Mission */}
          <div className="space-y-4 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-theme-xs">
                <svg
                  className="size-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                </svg>
              </div>
              <div>
                <h4 className="font-outfit text-base font-bold text-gray-900 dark:text-white">
                  Uloom-e-Islamia
                </h4>
                <p className="text-[11px] font-medium text-brand-600 dark:text-brand-400">
                  Madrasa &amp; Jamia
                </p>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
              A premier Islamic educational institution dedicated to excellence in Quranic
              memorization, Dars-e-Nizami Islamic studies, and moral grooming.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-brand-200 bg-brand-50/50 px-2.5 py-1 text-[11px] font-medium text-brand-700 dark:border-brand-900/50 dark:bg-brand-950/40 dark:text-brand-300">
              <span>Wafaq-ul-Madaris Affiliated</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Quick Links
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                >
                  About Our Madrasa
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Academic Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/teachers"
                  className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Faculty &amp; Asateeza
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: More Links */}
          <div>
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Portals &amp; Support
            </h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/admission"
                  className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Online Admissions
                </Link>
              </li>
              <li>
                <Link
                  to="/fundraising"
                  className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Fundraising &amp; Donations
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-brand-600 dark:hover:text-brand-400"
                >
                  Contact &amp; Inquiries
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  className="inline-flex items-center gap-1 font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  <span>Student / Staff Login</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social Info */}
          <div>
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Get in Touch
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <MapIcon className="size-4 shrink-0 mt-0.5 text-brand-500" />
                <span>Main Campus, Near UET, Mardan / Swat Branch, KP, Pakistan</span>
              </li>
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="size-4 shrink-0 text-brand-500" />
                <a
                  href="mailto:info@madrassa-uloomeislamia.edu.pk"
                  className="hover:underline"
                >
                  info@madrassa-uloomeislamia.edu.pk
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-success-600 dark:text-success-400">
                  WA:
                </span>
                <a
                  href="https://wa.me/923029558584"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline font-mono"
                >
                  +92 302 9558584
                </a>
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-3">
              <span className="text-xs text-gray-500">Office Hours: Mon–Fri, 8AM–4PM</span>
            </div>
          </div>

          {/* Column 5: Map Location Card */}
          <div className="lg:col-span-1">
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Campus Location
            </h5>
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3 dark:border-gray-800 dark:bg-white/5">
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                <iframe
                  title="Campus Location Map"
                  src="https://maps.google.com/maps?q=Mardan,%20Khyber%20Pakhtunkhwa,%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full border-0"
                  loading="lazy"
                ></iframe>
              </div>
              <p className="mt-2 text-[11px] text-gray-500 dark:text-gray-400 text-center">
                Spacious residential campus with modern boarding facilities.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 pt-6 text-center text-xs text-gray-500 sm:flex sm:items-center sm:justify-between dark:border-gray-800 dark:text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Madrasa Uloom-e-Islamia Management Information System.
            All rights reserved.
          </p>
          <div className="mt-2 sm:mt-0 flex items-center justify-center gap-4">
            <Link to="/about" className="hover:underline">
              About
            </Link>
            <Link to="/admission" className="hover:underline">
              Admissions
            </Link>
            <Link to="/fundraising" className="hover:underline">
              Donations
            </Link>
            <Link to="/signin" className="hover:underline">
              Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;

