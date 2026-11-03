import { ThemeToggleButton } from "@/components/common/ThemeToggleButton";
import { CloseIcon, MenuIcon } from "@/icons";
import { cn } from "@/utils";
import React, { useState } from "react";
import { Link, useLocation } from "react-router";

interface NavLinkItem {
  name: string;
  path: string;
  badge?: string;
}

const navLinks: NavLinkItem[] = [
  { name: "Home", path: "/" },
  { name: "Courses", path: "/courses" },
  { name: "Teachers", path: "/teachers" },
  { name: "About Us", path: "/about" },
  { name: "Admission", path: "/admission", badge: "Open" },
  { name: "Donations", path: "/fundraising" },
  { name: "Contact", path: "/contact" },
];

export const PublicNavbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-999 w-full border-b border-gray-200 bg-white/95 backdrop-blur-md transition-colors dark:border-gray-800 dark:bg-gray-900/95">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand Logo & Title */}
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
          <div className="flex flex-col">
            <span className="font-outfit text-base font-bold tracking-tight text-gray-900 sm:text-lg dark:text-white">
              Madrasa Uloom-e-Islamia
            </span>
            <span className="text-[11px] font-medium text-brand-600 dark:text-brand-400">
              Wafaq-ul-Madaris Affiliated
            </span>
          </div>
        </Link>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 lg:flex xl:gap-2">
          {navLinks.map((link) => {
            const active = isActive(link.path);
            return (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                )}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span className="ms-1.5 rounded-full bg-success-50 px-1.5 py-0.5 text-[10px] font-semibold text-success-600 dark:bg-success-500/15 dark:text-success-400">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggleButton />

          {/* Portal Login Button */}
          <Link
            to="/signin"
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-500 px-3.5 py-2 text-sm font-medium text-white shadow-theme-xs transition-colors hover:bg-brand-600 focus:outline-hidden"
          >
            <span>Portal Login</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex size-10 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-100 lg:hidden dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pt-3 pb-6 shadow-theme-lg lg:hidden dark:border-gray-800 dark:bg-gray-900">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-lg px-3 py-2.5 text-base font-medium transition-colors",
                    active
                      ? "bg-brand-50 text-brand-600 dark:bg-brand-500/15 dark:text-brand-400"
                      : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/5 dark:hover:text-white"
                  )}
                >
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="rounded-full bg-success-50 px-2 py-0.5 text-xs font-semibold text-success-600 dark:bg-success-500/15 dark:text-success-400">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-800 flex flex-col gap-2">
              <Link
                to="/signin"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-lg bg-brand-500 py-2.5 text-center text-sm font-medium text-white shadow-theme-xs hover:bg-brand-600"
              >
                Sign In to Portal
              </Link>
              <Link
                to="/admission"
                onClick={() => setMobileMenuOpen(false)}
                className="flex w-full items-center justify-center rounded-lg border border-gray-300 py-2.5 text-center text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-white/5"
              >
                Online Admission Form
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;

