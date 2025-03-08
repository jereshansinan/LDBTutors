import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function ClientDashboard() {
  // Fetch the current user
  const user = await currentUser();
  const userName = user?.firstName;

  // Fetch translations based on the user's language preference
  const language = user?.unsafeMetadata?.language || "en"; // Default to English
  const translations = await fetch(`/locales/${language}.json`).then((res) =>
    res.json()
  );

  return (
    <div className="min-h-screen bg-gray-100 p-1 md:p-10">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          {translations.clientDashboard.welcomeMessage.replace(
            "{userName}",
            userName || "Client"
          )}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          {translations.clientDashboard.welcomeDescription}
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Book a Service */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {translations.clientDashboard.cards.bookService.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            {translations.clientDashboard.cards.bookService.description}
          </p>
          <Link
            href="/client/book-service"
            className="inline-block bg-[#75E379] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300"
          >
            {translations.clientDashboard.cards.bookService.buttonText}
          </Link>
        </div>

        {/* Card 2: View History */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {translations.clientDashboard.cards.viewHistory.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            {translations.clientDashboard.cards.viewHistory.description}
          </p>
          <Link
            href="/client/history"
            className="inline-block bg-[#75E379] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300"
          >
            {translations.clientDashboard.cards.viewHistory.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}