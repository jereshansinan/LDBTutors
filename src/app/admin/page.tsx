"use client"; // Mark this as a client component

import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [translations, setTranslations] = useState({
    adminDashboard: {
      welcomeMessage: "Welcome back, {userName}!",
      welcomeDescription: "Manage your coaching schedules and client bookings with ease.",
      cards: {
        manageCoaches: {
          heading: "Manage Coaches & Schedules",
          description: "View, edit, and manage coaching schedules for your team.",
          buttonText: "Go to Coaches",
        },
        manageBookings: {
          heading: "Manage Client Bookings",
          description: "View and manage all client bookings and appointments.",
          buttonText: "Go to Bookings",
        },
      },
    },
  });

  const [userName, setUserName] = useState("Admin");

  // Fetch translations and user data
  useEffect(() => {
    // Fetch the current user
    const fetchUser = async () => {
      const user = await currentUser();
      setUserName(user?.firstName || "Admin");
    };

    // Fetch translations based on the language preference in localStorage
    const language = localStorage.getItem("language") || "en"; // Default to English
    fetch(`/locales/${language}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error loading translations:", error));

    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-1 md:p-10">
      {/* Welcome Message */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900">
          {translations.adminDashboard.welcomeMessage.replace(
            "{userName}",
            userName
          )}
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mt-2">
          {translations.adminDashboard.welcomeDescription}
        </p>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: Manage Coaches & Schedules */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {translations.adminDashboard.cards.manageCoaches.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            {translations.adminDashboard.cards.manageCoaches.description}
          </p>
          <Link
            href="/admin/coaches"
            className="inline-block bg-[#75E379] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300"
          >
            {translations.adminDashboard.cards.manageCoaches.buttonText}
          </Link>
        </div>

        {/* Card 2: Manage Client Bookings */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            {translations.adminDashboard.cards.manageBookings.heading}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            {translations.adminDashboard.cards.manageBookings.description}
          </p>
          <Link
            href="/admin/bookings"
            className="inline-block bg-[#75E379] text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-black transition-colors duration-300"
          >
            {translations.adminDashboard.cards.manageBookings.buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
}