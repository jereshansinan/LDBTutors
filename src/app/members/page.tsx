"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Lenis from "@/components/lenis";

export default function MembersPage() {
  const [translations, setTranslations] = useState(() => ({
    membersPage: {
      title: "Our Team",
      features: {
        expertTeam: {
          name: "EXPERT TEAM",
          description:
            "Our team includes former elite athletes, certified coaches, strength and conditioning experts, nutritionists, biokinetics, and sports psychologists—all committed to delivering the best training experience for each athlete.",
          image: "/expert-team.jpg",
        },
        leadership: {
          name: "LEADERSHIP",
          description:
            "A dynamic leadership team and industry expert partners with deep experience in both sports management and athlete development.",
          image: "/leadership.jpg",
        },
        supportStaff: {
          name: "SUPPORT STAFF",
          description:
            "Specialized professionals in rehabilitation, recovery, and performance optimization to ensure every athlete receives the best care.",
          image: "/support-staff.jpg",
        },
        trainingFacility: {
          name: "TRAINING FACILITY AND TECHNOLOGY",
          description:
            "Our state-of-the-art training facilities give you access to professional-level training fields, advanced equipment to monitor performance, and cutting-edge technology in performance assessment and recovery tools to ensure that athletes have the resources they need to excel.",
          image: "/training-facility.jpg",
        },
      },
      team: [
        {
          id: "edelbertDinha",
          name: "EDELBERT DINHA",
          position: "Head Coach",
          description:
            "Our Head Coach at Molende Training is a CAF B licensed coach and a celebrated Orlando Pirates legend. With his deep knowledge of the game and extensive experience, Dinha brings an elite level of professionalism and insight to our training program.",
          image: "/profile.jpg",
        },
        {
          id: "jesseDonn",
          name: "JESSE DONN",
          position: "Lifestyle Coach",
          description:
            "As a former professional footballer with over seven years of elite-level experience, Jesse has lived the lifestyle of an athlete, mastering the art of performance optimization.",
          image: "/profile.jpg",
        },
        {
          id: "ratiG",
          name: "RATI GUARAJENA",
          position: "Biokinetic",
          description:
            "Rati leads our team with a passion for helping people achieve their fitness goals. As a qualified biokineticist, she specializes in rehabilitation for injuries and age-related concerns.",
          image: "/profile.jpg",
        },
        {
          id: "brydenC",
          name: "BRYDEN CABRAL",
          position: "Strength And Conditioning",
          description: "Creative mastermind.",
          image: "/profile.jpg",
        },
        {
          id: "siobanS",
          name: "SIOBAN STANDER",
          position: "Strength And Conditioning",
          description: "Team motivator.",
          image: "/profile.jpg",
        },
      ],
    },
  }));  

  useEffect(() => {
    const language = localStorage.getItem("language") || "en"; // Default to English
    fetch(`/locales/${language}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error loading translations:", error));
  }, []);

  return (
    <Lenis>
      <Navbar />
      <Hero media="/home.jpg" heading={translations.membersPage.title} />
      <section className="py-8 px-2 md:px-[130px]">
        
        {/* Features Section */}
        {Object.values(translations.membersPage.features).map((item, index) => (
          <section key={index} className="relative w-full">
            <div
              className={`absolute inset-0 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-[#75E379]"
              }`}
            ></div>

            <div className="relative z-10 flex flex-col md:flex-row items-center py-16">
              {index % 2 !== 0 && (
                <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
                  <Image
                    src={item.image}
                    alt={item.image}
                    width={600}
                    height={600}
                    className="rounded-lg object-cover shadow-lg aspect-square"
                  />
                </div>
              )}

              <div className="w-full md:w-1/2 text-center md:text-left px-6 md:px-[130px]">
                <h3 className="text-xl md:text-4xl font-semibold mb-6">
                  {item.name}
                </h3>
                <p className="text-base md:text-2xl text-black leading-relaxed">
                  {item.description}
                </p>
              </div>

              {index % 2 === 0 && (
                <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
                  <Image
                    src={item.image}
                    alt={item.image}
                    width={600}
                    height={600}
                    className="rounded-lg object-cover shadow-lg aspect-square"
                  />
                </div>
              )}
            </div>
          </section>
        ))}

        <h1 className="text-center text-xl md:text-4xl font-bold my-6">
          {translations.membersPage.title}
        </h1>

        {/* Team Members Section */}
        <div className="mt-12 grid md:grid-cols-1 gap-6">
          {translations.membersPage.team.map((member, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-center bg-gray-100 rounded-lg p-8 shadow-lg transition-all duration-300 hover:bg-[#75E379]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Image
                src={member.image}
                alt={member.name}
                width={500}
                height={500}
                className="rounded-lg object-cover border-2 border-gray-300 aspect-square"
              />

              <div className="ml-6 text-center md:text-left">
                <h3 className="text-lg md:text-3xl font-semibold">
                  {member.name}
                </h3>
                <p className="text-base md:text-2xl text-gray-600">
                  {member.position}
                </p>
                <p className="text-base md:text-2xl mt-2 whitespace-pre-line">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </Lenis>
  );
}
