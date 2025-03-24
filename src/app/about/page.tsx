"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Lenis from "@/components/lenis";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function About() {
  const [translations, setTranslations] = useState({
    aboutPage: {
      heroHeading: "About Us",
      whoWeAre: {
        heading: "Who We Are",
        description1:
          "Molende Sports is a player development and management company dedicated to nurturing football talent in Africa. Through its Molende Training Program, it offers specialized training services, including fieldwork, strength & conditioning, rehab, and sports assessments. The company collaborates with top coaches, biokineticists, and performance specialists to help players reach professional levels.",
        description2:
          "Additionally, Molende Management represents and guides players in their careers, securing opportunities locally and internationally through strategic partnerships with clubs and agencies.",
        description3:
          "With a strong focus on holistic player development, Molende Sports ensures athletes are physically, mentally, and tactically prepared for the demands of professional football.",
        description4:
          "Recognizing the challenges South African footballers face in securing positions with top European clubs, it’s evident that enhancing individual training regimens can significantly improve their prospects. A study highlighted that African players who undergo grassroots training within European systems tend to have higher success rates in joining elite clubs and competitive national teams",
        description5:
          "Integrating personalized strength and conditioning programs into a player’s routine has been shown to yield substantial benefits. Research indicates that such individualized training can lead to a 50% reduction in injury occurrences and a 77% decrease in days lost due to injuries. This improvement in physical resilience is accompanied by increases in game participation, playing minutes, goals scored, assists, and overall market value.",
        description6:
          "Moreover, the journey of Alexander Isak serves as a pertinent example. His progression from AIK Stockholm’s academy to becoming a leading striker for Newcastle underscores the importance of tailored training and development. Isak’s coaches emphasized that a pivotal push at the age of fourteen was crucial in honing his abilities and mindset, leading to his current professional success.",
        description7:
          "By adopting similar personalized training approaches, South African footballers can enhance their skills, reduce injury risks, and align more closely with the demands of top-tier European football.",
      },
      mission: {
        heading: "Our Mission",
        description:
          "To empower athletes with tailored training and recovery programs, ensuring they perform at their peak while preventing injuries and optimizing recovery time.",
      },
      vision: {
        heading: "Our Vision",
        description:
          "To revolutionize the way athletes train, recover, and perform by offering holistic, science-backed solutions that go beyond traditional training.",
      },
    },
  });

  useEffect(() => {
    // Check if window and localStorage are available (client-side check)
    if (typeof window !== "undefined" && window.localStorage) {
      const language = localStorage.getItem("language") || "en"; // Default to English
      fetch(`/locales/${language}.json`)
        .then((response) => response.json())
        .then((data) => setTranslations(data))
        .catch((error) => console.error("Error loading translations:", error));
    }
  }, []);

  return (
    <Lenis>
      <Navbar />
      <Hero media={"/home.jpg"} heading={translations.aboutPage.heroHeading} />
      <div className="w-full md:px-[130px]">
        {/* Who We Are Section */}
        <section className="py-2 md:py-10 display flex justify-between">
          <div className="hidden md:flex flex-col gap-4 w-1/4 text-gray-500 text-sm md:text-xl font-semibold">
            <p>{translations.aboutPage.whoWeAre.heading}</p>
            <p>{translations.aboutPage.mission.heading}</p>
            <p>{translations.aboutPage.vision.heading}</p>
          </div>
          <div className="w-full md:w-[calc(100% - 422px)] px-2 md:px-0">
            <h2 className="text-xl md:text-4xl font-bold mb-4 md:text-left text-center font-heading">
              {translations.aboutPage.whoWeAre.heading}
            </h2>
            <p className="text-gray-700 text-base md:text-2xl md:text-left leading-relaxed font-body mb-4">
              {translations.aboutPage.whoWeAre.description1}
            </p>
            <p className="text-gray-700 text-base md:text-2xl md:text-left leading-relaxed font-body mb-4">
              {translations.aboutPage.whoWeAre.description2}
            </p>
            <p className="text-gray-700 text-base md:text-2xl md:text-left leading-relaxed font-body">
              {translations.aboutPage.whoWeAre.description3}
            </p>
          </div>
        </section>

        {/* Large Image Section with Proper Scaling */}
        <section className="py-5 md:py-10 mx-auto grid gap-5 md:gap-10 px-2 md:px-0">
          <div
            className="w-full px-2 md:px-0 md:p-0 relative h-40 md:h-72 lg:h-[30rem] rounded-lg overflow-hidden bg-fixed bg-cover bg-center"
            style={{
              backgroundImage: "url('/whoweare.jpg')",
            }}
          >
            {/* Optional: Add overlay or text */}
            <div className="w-full h-full flex items-center justify-center">
              <h2 className="text-xl md:text-4xl font-bold text-white text-center">
                Why Molende
              </h2>
            </div>
          </div>
        </section>

        <div className="w-full md:w-[calc(100% - 422px)] px-2 md:px-0">
          <p className="text-gray-700 text-base md:text-2xl md:text-left leading-relaxed font-body mb-4">
            {translations.aboutPage.whoWeAre.description4}
          </p>
          <p className="text-gray-700 text-base md:text-2xl md:text-left leading-relaxed font-body mb-4">
            {translations.aboutPage.whoWeAre.description5}
          </p>
          <p className="text-gray-700 text-base md:text-2xl md:text-left leading-relaxed font-body">
            {translations.aboutPage.whoWeAre.description6}
          </p>
          <p className="text-gray-700 text-base md:text-2xl md:text-left leading-relaxed font-body">
            {translations.aboutPage.whoWeAre.description7}
          </p>
        </div>

        {/* Alternating Grid Sections */}
        <section className="py-5 md:py-10 mx-auto grid gap-5 md:gap-10 px-2 md:px-0">
          {/* First Grid Item - Image on Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-xl md:text-4xl font-bold text-[#75E379] font-heading mb-2 md:mb-4">
                {translations.aboutPage.mission.heading}
              </h2>
              <p className="text-gray-700 text-base md:text-2xl leading-relaxed font-body">
                {translations.aboutPage.mission.description}
              </p>
            </div>
            <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden order-1 md:order-2">
              <Image
                src="/mission1.jpg"
                alt="First Section"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Second Grid Item - Image on Left */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 items-center">
            <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/vision.jpg"
                alt="Second Section"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-4 text-[#75E379]">
                {translations.aboutPage.vision.heading}
              </h2>
              <p className="text-gray-700 text-base md:text-2xl leading-relaxed">
                {translations.aboutPage.vision.description}
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </Lenis>
  );
}
