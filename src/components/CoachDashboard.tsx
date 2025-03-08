// components/CoachDashboard.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface CoachDashboardProps {
  userName: string;
}

export default function CoachDashboard({ userName }: CoachDashboardProps) {
  const [translations, setTranslations] = useState({
    coachDashboard: {
      welcomeMessage: "Welcome, {userName}!",
      welcomeDescription: "Manage your schedule and check-ins here.",
      cards: {
        viewSchedule: {
          heading: "View Schedule",
          description: "Check your upcoming sessions and appointments.",
          buttonText: "View Schedule",
        },
        checkIn: {
          heading: "Check In",
          description: "Mark your attendance for scheduled sessions.",
          buttonText: "Check In",
        },
      },
    },
  });

  // Fetch translations based on the language preference in localStorage
  useEffect(() => {
    const language = localStorage.getItem("language") || "en"; // Default to English
    fetch(`/locales/${language}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error loading translations:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-1 md:p-10">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          {translations.coachDashboard.welcomeMessage.replace(
            "{userName}",
            userName
          )}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          {translations.coachDashboard.welcomeDescription}
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: View Schedule */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {translations.coachDashboard.cards.viewSchedule.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            {translations.coachDashboard.cards.viewSchedule.description}
          </p>
          <Link
            href="/coach/schedule"
            className="inline-block bg-[#75E379] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300"
          >
            {translations.coachDashboard.cards.viewSchedule.buttonText}
          </Link>
        </div>

        {/* Card 2: Check In */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {translations.coachDashboard.cards.checkIn.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            {translations.coachDashboard.cards.checkIn.description}
          </p>
          <Link
            href="/coach/check-in"
            className="inline-block bg-[#75E379] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300"
          >
            {translations.coachDashboard.cards.checkIn.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}