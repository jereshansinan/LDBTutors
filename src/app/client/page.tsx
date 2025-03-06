import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function ClientDashboard() {
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
          Book a service or View you booking history.
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Manage Coaches & Schedules */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Book a Service
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Schedule your service effortlessly with just a few clicks. Choose
            from our available options, select a convenient time, and let our
            experts handle the
          </p>
          <Link
            href="/client/book-service"
            className="inline-block bg-[#75E379] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300"
          >
            Book Service
          </Link>
        </div>

        {/* Card 2: Manage Client Bookings */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            View History
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            View a history of all your bookings
          </p>
          <Link
            href="/client/history"
            className="inline-block bg-[#75E379] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300"
          >
            Go to History
          </Link>
        </div>
      </div>
    </div>
  );
}
