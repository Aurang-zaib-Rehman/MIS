import React, { useEffect } from "react";
import { Outlet } from "react-router";
import PublicFooter from "./PublicFooter";
import PublicNavbar from "./PublicNavbar";

// All public banner and high-priority assets pre-cached in memory for 0ms route transitions
const PUBLIC_PRELOAD_ASSETS = [
  "/images/hero-mosque.jpg",
  "/images/courses-banner.jpg",
  "/images/teachers_banner.jpeg",
  "/images/about_banner.jpeg",
  "/images/admission_banner.jpeg",
  "/images/donation_banner.jpeg",
  "/images/contact_banner.jpeg",
  "/images/footer-mosque.jpg",
  "/images/login.jfif",
  "/images/signup.jpeg",
  "/images/user/muhtamim.jpeg",
  "/images/user/staff.jpeg",
];

export const PublicLayout: React.FC = () => {
  useEffect(() => {
    // Eagerly prefetch and decode all banner images into browser memory cache
    PUBLIC_PRELOAD_ASSETS.forEach((src) => {
      const img = new Image();
      img.src = src;
      if ("decode" in img) {
        img.decode().catch(() => {});
      }
    });
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 text-gray-800 antialiased selection:bg-brand-500 selection:text-white dark:bg-gray-950 dark:text-gray-100">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <PublicFooter />
    </div>
  );
};

export default PublicLayout;

