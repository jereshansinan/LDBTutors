// components/ClientDashboard.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ClientDashboardProps {
  userName: string;
}

export default function ClientDashboard({ userName }: ClientDashboardProps) {
  const [translations, setTranslations] = useState({
    clientDashboard: {
      welcomeMessage: "Welcome, {userName}!",
      welcomeDescription: "Book services and view your training history.",
      cards: {
        bookService: {
          heading: "Book a Service",
          description: "Schedule a new training session or service.",
          buttonText: "Book Now",
        },
        viewHistory: {
          heading: "View History",
          description: "Check your past bookings and training sessions.",
          buttonText: "View History",
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
    <div className="min-h-screen bg-[#0c0e12] p-1 md:p-10">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-white">
          {translations.clientDashboard.welcomeMessage.replace(
            "{userName}",
            userName
          )}
        </h1>
        <p className="text-lg md:text-xl text-white mt-2">
          {translations.clientDashboard.welcomeDescription}
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Book a Service */}
        <div className="bg-black rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {translations.clientDashboard.cards.bookService.heading}
          </h2>
          <p className="text-lg md:text-xl text-white mb-6">
            {translations.clientDashboard.cards.bookService.description}
          </p>
          <Link
            href="/client/book-service"
            className="inline-block bg-[#fa5407] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300 mt-auto self-start"
          >
            {translations.clientDashboard.cards.bookService.buttonText}
          </Link>
        </div>

        {/* Card 2: View History */}
        <div className="bg-black rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300 flex flex-col">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {translations.clientDashboard.cards.viewHistory.heading}
          </h2>
          <p className="text-lg md:text-xl text-white mb-6">
            {translations.clientDashboard.cards.viewHistory.description}
          </p>
          <Link
            href="/client/history"
            className="inline-block bg-[#fa5407] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300 mt-auto self-start"
          >
            {translations.clientDashboard.cards.viewHistory.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}
