"use client";
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
} from "react-icons/fa";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
  const [translations, setTranslations] = useState({
    footer: {
      logoAlt: "Company Logo",
      navigation: {
        home: "Home",
        about: "About",
        members: "Our Team",
        services: "Services",
        contact: "Contact",
      },
      contact: {
        phone: "+27 65 919 9598",
        email: "info@molendesports.co.za",
      },
      socialMedia: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
        linkedin: "LinkedIn",
        youtube: "YouTube",
        tiktok: "TikTok",
      },
      copyright: "© {year} MondeleSports (Pty) Ltd. All rights reserved.",
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
    <footer className="bg-white text-black py-10 px-[130px]">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        {/* Left Section: Logo & Slogan */}
        <div className="flex flex-col items-center lg:items-start">
          <Image
            src="/Logowhite.png"
            alt={translations.footer.logoAlt}
            width={120}
            height={50}
            className="w-20 md:w-52"
          />
        </div>

        {/* Center Section: Navigation Links */}
        <div className="flex flex-col items-center space-y-2 my-6 lg:my-0">
          <Link href="/" className="hover:text-[#75E379]">
            {translations.footer.navigation.home}
          </Link>
          <Link href="/about" className="hover:text-[#75E379]">
            {translations.footer.navigation.about}
          </Link>
          <Link href="/members" className="hover:text-[#75E379]">
            {translations.footer.navigation.members}
          </Link>
          <Link href="/services" className="hover:text-[#75E379]">
            {translations.footer.navigation.services}
          </Link>
          <Link href="/contact" className="hover:text-[#75E379]">
            {translations.footer.navigation.contact}
          </Link>
        </div>

        {/* Right Section: Contact Info & Social Icons */}
        <div className="flex flex-col items-center lg:items-end">
          {/* Phone & Email */}
          <div className="flex items-center space-x-2 mb-2">
            <FaPhone className="text-green-400" />
            <p className="text-sm">{translations.footer.contact.phone}</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaEnvelope className="text-blue-400" />
            <p className="text-sm">{translations.footer.contact.email}</p>
          </div>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://wa.me/27659199598?text=I%20am%20interested%20in%20your%20services"
              className="text-xl text-black hover:text-green-300"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/molendesports?igsh=MXBueHpkbjFsanMycw=="
              className="text-xl text-black hover:text-pink-400"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/company/molendesports/"
              className="text-xl text-black hover:text-blue-400"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://youtube.com/@molendesports?si=zZKSXVZb6W8NWTP1"
              className="text-xl text-black hover:text-red-600"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.tiktok.com/@molende.sports?_t=ZM-8uTRPdlttkV&_r=1"
              className="text-xl text-black hover:text-gray-300"
            >
              <FaTiktok />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 text-sm mt-6">
        {translations.footer.copyright.replace("{year}", "2025")}
      </p>
    </footer>
  );
}
