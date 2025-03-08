"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Services() {
  const [translations, setTranslations] = useState({
    servicesPage: {
      heroHeading: "Our Services",
      pageDescription:
        "Molende Sports offers a variety of specialized training programs designed to enhance performance, strength, and recovery. All programs are personalized based on the athlete’s needs, goals, and sport.",
      services: [
        {
          title: "Field Training",
          description:
            "Our 1 on 1 Training includes on-field training programs that focus and help athletes improve these skills ensuring they are ready to perform when it counts.",
          price: "R400",
          includes: [
            "Game strategy",
            "Situational awareness",
            "Agility",
            "Reaction time",
            "Understanding of game dynamics",
          ],
          groupTraining: {
            4: "R1000",
            8: "R1800",
            12: "R2400",
          },
        },
        {
          title: "Strength & Conditioning",
          description:
            "Built on science-backed techniques designed to help athletes enhance their physical performance and prevent injuries.",
          price: "R400",
          includes: ["Endurance", "Agility", "Power"],
          groupTraining: {
            4: "R1000",
            8: "R1800",
            12: "R2400",
          },
        },
        {
          title: "Standard Package",
          description:
            "A great choice for athletes looking to build a strong foundation, providing essential training programs to improve key skills and overall fitness at a steady pace.",
          price: "R3800",
          includes: [
            "8x Field sessions per Month",
            "8x Strength & Conditioning",
            "4x Recovery Session",
            "4x Mobility and Flexibility classes",
          ],
        },
        {
          title: "Elite Package",
          description:
            "Designed for serious athletes aiming for peak performance, offering advanced training programs to help you reach the highest level of competition.",
          price: "R6600",
          includes: [
            "8x Field sessions per Month",
            "8x Strength & Conditioning",
            "4x Recovery Session",
            "4x Mobility and Flexibility classes",
            "Nutrition Guidance",
            "Sleep Optimisation",
          ],
        },
      ],
      otherServices: [
        { title: "Athlete Assessment and Profiling", price: "R700" },
        {
          title: "Online Training Program (5 sessions per week + 2 check ins)",
          price: "R750",
        },
        { title: "Injury Assessment + FMS Assessment", price: "R1000" },
        {
          title: "Lifestyle Assessment (Nutrition + Sleep + Supplements)",
          price: "R850",
        },
        { title: "Rehabilitation", price: "Custom" },
        { title: "Recovery", price: "R50 /15 minutes" },
      ],
      assessmentSection: {
        heading: "Assessment and Profiling",
        description:
          "A comprehensive physical evaluation designed to assess your current athletic abilities and track your progress over time. The assessment also helps in tailoring a personalized training program and nutrition plan for the athlete. The assessment includes:",
        listItems: [
          "Speed & Acceleration Tests",
          "Jump Tests & Leg Power",
          "Leg Symmetry & Individual Leg Power",
          "Agility Tests",
          "Upper Body Power Tests",
          "Fitness Tests & Specific Prescription",
          "Adult Height & Growth Spurt Predictions",
        ],
      },
    },
  });

  useEffect(() => {
    const language = localStorage.getItem("language") || "en"; // Default to English
    fetch(`/locales/${language}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error loading translations:", error));
  }, []);

  return (
    <div>
      <Navbar />
      <Hero media={"/home.jpg"} heading={translations.servicesPage.heroHeading} />

      {/* Main Content with 130px left/right padding */}
      <div className="px-2 md:px-[130px] py-8">
        {/* Page Heading */}
        <div className="mb-2 md:mb-12">
          <h1 className="text-center text-xl md:text-4xl font-bold mb-4">
            {translations.servicesPage.heroHeading}
          </h1>
          <p className="text-left md:text-center text-base md:text-xl text-gray-600">
            {translations.servicesPage.pageDescription}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5 md:mb-12">
          {translations.servicesPage.services.map((service, index) => (
            <div
              key={service.title}
              className="flex flex-col rounded-lg overflow-hidden border"
            >
              {/* Service Image */}
              <div className="relative w-full h-[400px]">
                <Image
                  src={`/${service.title.toLowerCase().replace(/ /g, "")}.jpg`}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>

              {/* Bordered Content Section */}
              <div className="p-2 md:p-6 flex flex-col flex-1">
                <h2 className="text-xl md:text-xl font-semibold mb-2 min-h-[3.5rem]">
                  {service.title}
                </h2>

                {/* Description Section */}
                <p
                  className={`text-base md:text-lg text-gray-700 ${
                    index === 1
                      ? "min-h-48 md:min-h-48 lg:min-h-[600px] xl:min-h-[300px]"
                      : "min-h-40 md:min-h-52 lg:min-h-[600px] xl:min-h-60"
                  }`}
                >
                  {service.description}
                </p>

                {/* Price Section */}
                <div className="text-center mb-6 md:mb-8">
                  <span className="text-3xl md:text-4xl font-bold">
                    {service.price}
                  </span>
                </div>

                {/* Button for Logged In Users */}
                <div className="text-center">
                  <button
                    onClick={() => {
                      const isLoggedIn = false; // Replace with actual login check
                      if (isLoggedIn) {
                        window.location.href = "/dashboard";
                      } else {
                        window.location.href = "/login";
                      }
                    }}
                    className="w-full py-2 bg-[#75E379] text-black rounded-lg font-semibold mb-6 md:mb-8 hover:bg-black hover:text-white"
                  >
                    Go to Dashboard
                  </button>
                </div>

                {/* Includes List */}
                <div className="mb-4">
                  {service.includes.map((inc, idx) => (
                    <div key={idx} className="flex items-center mb-2">
                      {/* Green Tick Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-[#75E379] flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-2 text-base md:text-lg">{inc}</span>
                    </div>
                  ))}
                </div>

                {/* Group Training Section for the 1st 2 services */}
                {index < 2 && service.groupTraining && (
                  <div className="mt-auto pt-4 border-t">
                    <h3 className="font-semibold mb-2 text-base md:text-lg">
                      Group Training
                    </h3>
                    <div className="space-y-1 text-base md:text-lg">
                      <div className="flex justify-between">
                        <span>4 sessions</span>
                        <span className="font-bold">
                          {service.groupTraining[4]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>8 sessions</span>
                        <span className="font-bold">
                          {service.groupTraining[8]}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>12 sessions</span>
                        <span className="font-bold">
                          {service.groupTraining[12]}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Other Services Section */}
        <div className="w-full bg-white py-2 md:py-8 px-0 md:px-4 mb-5 md:mb-12 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            Other Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {translations.servicesPage.otherServices.map((os) => (
              <div
                key={os.title}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <span className="text-xs md:text-lg">{os.title}</span>
                <span className="text-lg md:text-xl font-bold">{os.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment and Profiling Section */}
        <div className="mb-5 md:mb-12">
          <h2 className="text-xl md:text-4xl font-bold text-center mb-6">
            {translations.servicesPage.assessmentSection.heading}
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Video on the Left */}
            <div className="flex-1 w-full rounded-lg overflow-hidden">
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/your_video_id"
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
            {/* Description on the Right */}
            <div className="flex-1">
              <p className="text-base md:text-lg text-black mb-4">
                {translations.servicesPage.assessmentSection.description}
              </p>
              <ul className="text-base md:text-lg text-black list-disc pl-5">
                {translations.servicesPage.assessmentSection.listItems.map(
                  (item, idx) => (
                    <li key={idx}>{item}</li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}