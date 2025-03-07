"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 300], ["0%", "20%"]);

  // State to hold translations
  const [translations, setTranslations] = useState({
    heroTitle: "TRANSFORM PASSION INTO PRECISION",
    heroSubtitle:
      "Personalized training & recovery solutions for serious athletes",
  });

  // Load translations based on the selected language
  useEffect(() => {
    const language = localStorage.getItem("language") || "en"; // Default to English
    fetch(`/locales/${language}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error loading translations:", error));
  }, []);

  return (
    <section
      className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-center text-white overflow-hidden"
      style={{ backgroundImage: "url('/base.jpg')" }}
    >
      {/* Parallax Background Effect */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/home.jpg')",
          y: yBackground,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <motion.div
        className="bg-opacity-50 p-8 rounded-lg z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="md:text-6xl text-xl font-heading antialiased font-bold"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          {translations.heroTitle}
        </motion.h1>

        <motion.p
          className="text-lg font-body mt-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          {translations.heroSubtitle}
        </motion.p>
      </motion.div>
    </section>
  );
}
