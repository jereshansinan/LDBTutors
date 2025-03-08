"use client";
import { useEffect, useState } from "react";

export default function StatisticsBar() {
  const [translations, setTranslations] = useState({
    statistics: {
      users: "Users",
      projectsCompleted: "Projects Completed",
      customerSatisfaction: "Customer Satisfaction",
      another: "Another",
    },
  });

  useEffect(() => {
    const language = localStorage.getItem("language") || "en"; 
    fetch(`/locales/${language}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error loading translations:", error));
  }, []);

  const stats = [
    { label: translations.statistics.users, value: "10K+" },
    { label: translations.statistics.projectsCompleted, value: "500+" },
    { label: translations.statistics.customerSatisfaction, value: "98%" },
    { label: translations.statistics.another, value: "98%" },
  ];

  return (
    <section className="bg-[#75E379] text-white py-8 px-2 md:px-4">
      <div className="md:mx-auto w-full md:max-w-[calc(100%-260px)] flex justify-between items-center gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <p className="text-sm sm:text-2xl md:text-5xl font-bold font-body text-black">{stat.value}</p>
            <p className="text-xs sm:text-sm md:text-lg font-body text-black whitespace-pre-line">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}