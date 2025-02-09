"use client";

import { UserButton, SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, isSignedIn } = useUser();
  const router = useRouter();

  // Determine the dashboard URL based on the user's role
  const role = user?.publicMetadata?.role;
  const dashboardURL =
    role === "admin"
      ? "/admin"
      : role === "coach"
        ? "/coach"
        : "/client"; // Default to client dashboard if no role is set or role doesn't match


  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <Link href="/" className="text-xl font-bold">
        MyApp
      </Link>

      <div>
        {isSignedIn ? (
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push(dashboardURL)}
              className="bg-green-500 px-4 py-2 rounded-md text-white"
            >
              Go to Dashboard
            </button>
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <button className="bg-blue-500 px-4 py-2 rounded-md text-white">
              Login
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}
