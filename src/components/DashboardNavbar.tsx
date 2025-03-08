"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export default function DashboardNavbar() {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const [translations, setTranslations] = useState({
    dashboardNavbar: {
      dashboard: "Dashboard",
      coaches: "Coaches",
      bookService: "Book a Service",
      checkIn: "Check In",
      yourSchedule: "Your Schedule",
      allBookings: "All Bookings",
      history: "History",
      addCoach: "Add Coach",
    },
  });

  useEffect(() => {
    const language = localStorage.getItem("language") || "en"; // Default to English
    fetch(`/locales/${language}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error loading translations:", error));
  }, []);

  // Extract the page name from the path
  let pageTitle = translations.dashboardNavbar.dashboard;

  if (pathname.includes("/admin/coaches")) {
    pageTitle = translations.dashboardNavbar.coaches;
  }

  if (pathname.includes("/client/book-service")) {
    pageTitle = translations.dashboardNavbar.bookService;
  }

  if (pathname.includes("/coach/check-in")) {
    pageTitle = translations.dashboardNavbar.checkIn;
  }

  if (pathname.includes("/coach/schedule")) {
    pageTitle = translations.dashboardNavbar.yourSchedule;
  }

  if (pathname.includes("/admin/bookings")) {
    pageTitle = translations.dashboardNavbar.allBookings;
  }

  if (pathname.includes("/client/history")) {
    pageTitle = translations.dashboardNavbar.history;
  }

  // Determine if the user is an admin
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <nav className="flex items-center justify-between px-3 md:px-4 pt-4 md:p-4 bg-white text-black font-body">
      {/* Page Title */}
      <h1 className="text-xl font-bold sm:text-lg md:text-xl lg:text-2xl">
        {pageTitle}
      </h1>

      {/* Admin-only "Add Coach" button (only on /admin/coaches page) */}
      {isAdmin && pathname === "/admin/coaches" && (
        <div className="ml-auto pr-1">
          <button
            onClick={() => router.push("/admin/add-coach")}
            className="bg-green-500 px-3 py-1 md:px-4 rounded-md text-white text-xs sm:text-xs md:text-sm"
          >
            {translations.dashboardNavbar.addCoach}
          </button>
        </div>
      )}
    </nav>
  );
}