import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function CoachDashboard() {
  // Fetch the current user
  const user = await currentUser();
  const userName = user?.firstName;

  return (
    <div className="min-h-screen bg-gray-100 p-1 md:p-10">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          Welcome back, {userName}!
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          View your schedules and check in to sessions with ease.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Manage Coaches & Schedules */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            View Schedule
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Stay on top of all coaching sessions with an organized schedule.
          </p>
          <Link
            href="/coach/schedule"
            className="inline-block bg-[#75E379] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300"
          >
            Go to Schedule
          </Link>
        </div>

        {/* Card 2: Manage Client Bookings */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Check In
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Quickly check in clients for their sessions
          </p>
          <Link
            href="/coach/check-in"
            className="inline-block bg-[#75E379] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300"
          >
            Go to Sessions
          </Link>
        </div>
      </div>
    </div>
  );
}
