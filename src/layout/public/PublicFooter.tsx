import { EnvelopeIcon, MapIcon } from "@/icons";
import React from "react";
import { Link } from "react-router";

export const PublicFooter: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-brand-900/60 bg-[#041124] text-gray-200">
      {/* Background Image Container */}
      <div className="absolute inset-0 pointer-events-none">
        <img
          src="/images/footer-mosque.jpg"
          alt="Islamic Mosque Silhouette"
          className="size-full object-cover object-[center_30%]"
        />
        {/* Harmonious midnight-blue gradient overlay: ensures high text readability while keeping the glowing blue mosque and minarets vibrant and eye-catching */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#041124]/90 via-[#041124]/65 to-[#041124]/40" />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-14 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5 xl:gap-6">
          {/* Column 1: Brand & Mission (span 3) */}
          <div className="space-y-4 lg:col-span-3">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="flex size-10 items-center justify-center rounded-xl bg-brand-500 text-white shadow-theme-xs transition-transform group-hover:scale-105">
                <svg
                  className="size-6 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                </svg>
              </div>
              <div>
                <h4 className="font-outfit text-base font-bold text-white">
                  Uloom-e-Islamia
                </h4>
                <p className="text-[11px] font-medium text-brand-300">
                  Madrasa &amp; Jamia
                </p>
              </div>
            </Link>
            <p className="text-xs leading-relaxed text-gray-300/90">
              A premier Islamic educational institution dedicated to excellence in Quranic
              memorization, Dars-e-Nizami Islamic studies, and moral grooming.
            </p>
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/10 px-2.5 py-1 text-[11px] font-medium text-brand-200 backdrop-blur-sm">
              <span>Wafaq-ul-Madaris Affiliated</span>
            </div>
          </div>

          {/* Column 2: Quick Links (span 2) */}
          <div className="lg:col-span-2">
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  About Our Madrasa
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Academic Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/teachers"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Faculty &amp; Asateeza
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: More Links (span 2) */}
          <div className="lg:col-span-2">
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Portals &amp; Support
            </h5>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link
                  to="/admission"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Online Admissions
                </Link>
              </li>
              <li>
                <Link
                  to="/fundraising"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Fundraising &amp; Donations
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Contact &amp; Inquiries
                </Link>
              </li>
              <li>
                <Link
                  to="/signin"
                  className="inline-flex items-center gap-1 font-medium text-brand-300 hover:text-brand-200"
                >
                  <span>Student / Staff Login</span>
                  <span>&rarr;</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social Info (span 2) */}
          <div className="lg:col-span-2">
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Get in Touch
            </h5>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <MapIcon className="size-4 shrink-0 mt-0.5 text-brand-400" />
                <span className="text-gray-300">Main Campus, Near UET, Mardan / Swat Branch</span>
              </li>
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="size-4 shrink-0 text-brand-400" />
                <a
                  href="mailto:info@madrassa-uloomeislamia.edu.pk"
                  className="text-gray-300 hover:text-white hover:underline truncate"
                >
                  info@madrassa-uloomeislamia.edu.pk
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="font-semibold text-success-400">
                  WA:
                </span>
                <a
                  href="https://wa.me/923029558584"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-300 hover:text-white hover:underline font-mono"
                >
                  +92 302 9558584
                </a>
              </li>
              <li className="pt-1 text-[11px] text-gray-400">
                Office: Mon–Fri, 8AM–4PM
              </li>
            </ul>
          </div>

          {/* Column 5: Map Location (span 3 - Bigger, Cleaner without unnecessary card) */}
          <div className="lg:col-span-3">
            <h5 className="mb-3 text-sm font-semibold uppercase tracking-wider text-white">
              Campus Location
            </h5>
            <div className="relative h-44 sm:h-48 lg:h-44 xl:h-48 w-full overflow-hidden rounded-xl border border-white/20 shadow-theme-md">
              <iframe
                title="Campus Location Map"
                src="https://maps.google.com/maps?q=Mardan,%20Khyber%20Pakhtunkhwa,%20Pakistan&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="size-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/15 pt-6 text-center text-xs text-gray-400 sm:flex sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} Madrasa Uloom-e-Islamia Management Information System.
            All rights reserved.
          </p>
          <div className="mt-2 sm:mt-0 flex items-center justify-center gap-4">
            <Link to="/about" className="hover:text-white hover:underline">
              About
            </Link>
            <Link to="/admission" className="hover:text-white hover:underline">
              Admissions
            </Link>
            <Link to="/fundraising" className="hover:text-white hover:underline">
              Donations
            </Link>
            <Link to="/signin" className="hover:text-white hover:underline">
              Portal
            </Link>
          </div>
        </div>

        {/* Developer Credits */}
        <div className="mt-4 border-t border-white/10 pt-4 text-center text-xs text-gray-400">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>Developed by</span>
            <a
              href="https://www.linkedin.com/in/haseeb-shoaib-rare-69100225b/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-300 transition-colors hover:text-white hover:underline"
            >
              M Haseeb
            </a>
            <span className="text-gray-500">•</span>
            <a
              href="https://www.linkedin.com/in/aurang-zaib-rehman/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-300 transition-colors hover:text-white hover:underline"
            >
              Aurang Zaib Rehman
            </a>
            <span className="text-gray-500">•</span>
            <a
              href="https://www.linkedin.com/in/aneela-qamar-19586b322"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-brand-300 transition-colors hover:text-white hover:underline"
            >
              Aneela Qamar
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;
