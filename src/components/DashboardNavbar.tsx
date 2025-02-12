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

  // Determine if the user is an admin
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      {/* Page Title */}
      <h1 className="text-xl font-bold">{pageTitle}</h1>

      {/* Admin-only "Add Coach" button (only on /admin/coaches page) */}
      {isAdmin && pathname === "/admin/coaches" && (
        <button
          onClick={() => router.push("/admin/add-coach")}
          className="bg-green-500 px-4 py-2 rounded-md text-white"
        >
          Add Coach
        </button>
      )}
    </nav>
  );
}
