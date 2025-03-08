"use client";

import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useInView } from "framer-motion";
import Image from "next/image";

const servicesImages = [
  "/expertcoach.jpg",
  "/tailored.jpg",
  "/recovery.png",
  "/sched.png",
];

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, duration: 0.8 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [translations, setTranslations] = useState({
    whyChooseUs: {
      paragraph:
        "Molende Sports is a performance-focused training facility designed to maximize athlete potential through tailored coaching, recovery solutions, and nutrition guidance. We specialize in off-season training, personalized fitness tracking, and sport-specific skill development for athletes aiming for high performance.",
      heading: "Why Choose Us",
      services: [
        {
          title: "Expert Coaches",
          description:
            "Years of experience in strength training, rehabilitation, and sport-specific skills.",
        },
        {
          title: "Tailored Programs",
          description:
            "Programs are customized to meet the unique needs of athletes at any level.",
        },
        {
          title: "Advanced Recovery Solutions",
          description:
            "Keeping athletes injury-free and performing at their best.",
        },
        {
          title: "Flexible Scheduling",
          description:
            "Sessions are available both on-site and virtually to fit athletes' schedules.",
        },
      ],
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
    <section className="py-8 md:py-16 px-0 md:px-8 bg-white" ref={ref}>
      <div className="mx-auto w-full max-w-[calc(100%-20px)] md:max-w-[calc(100%-260px)]">
        {/* Animated Paragraph */}
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-left text-xs sm:text-sm md:text-2xl mx-auto text-gray-700 mb-6 md:mb-8 font-body"
        >
          <motion.p variants={itemVariants}>
            {translations.whyChooseUs.paragraph}
          </motion.p>
        </motion.div>

        {/* Animated Heading */}
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="text-xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-heading"
        >
          {translations.whyChooseUs.heading}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {translations.whyChooseUs.services.map((service, index) => (
            <motion.div
              key={index}
              className="relative group w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden cursor-pointer"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Background Image */}
              <Image
                src={servicesImages[index]}
                alt={service.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 transform group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-[#75E379] transition-all duration-500 flex items-center justify-center text-white text-center p-4">
                <div className="transition-opacity duration-500">
                  <h3 className="text-2xl font-bold group-hover:mb-2 font-heading group-hover:text-black">
                    {service.title}
                  </h3>
                  <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-body text-black text-xs sm:text-sm md:text-2xl">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
