import React from "react";
import { Outlet } from "react-router";
import PublicFooter from "./PublicFooter";
import PublicNavbar from "./PublicNavbar";

export const PublicLayout: React.FC = () => {
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

