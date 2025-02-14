"use client";

import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function DashboardNavbar() {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  // Extract the page name from the path
  let pageTitle = pathname
    .replace("/", "")
    .replace("-", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase()) || "Dashboard";

  // Adjust the title for the "coaches" page
  if (pathname.includes("/admin/coaches")) {
    pageTitle = "Coaches";
  }

  if (pathname.includes("/client/book-service")) {
    pageTitle = "Book a Service"; 
  }

  if (pathname.includes("/coach/check-in")) {
    pageTitle = "Check In"; 
  }

  if (pathname.includes("/coach/schedule")) {
    pageTitle = "Your Schedule"; 
  }

  if (pathname.includes("/admin/bookings")) {
    pageTitle = "All Bookings"; 
  }

  // Determine if the user is an admin
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <nav className="flex items-center justify-between px-3 pt-4 md:p-4 bg-white text-black font-body">
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
            Add Coach
          </button>
        </div>
      )}
    </nav>
  );
}
