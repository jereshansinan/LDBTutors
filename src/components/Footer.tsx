"use client";
import {
  FaPhone,
  FaEnvelope,
  FaWhatsapp,
  FaInstagram,
  FaLinkedin,
  FaTiktok,
  FaYoutube,
  FaInfoCircle, 
  FaUsers, 
  FaHouseUser,
  FaConciergeBell,
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
        phone: "+27 73 748 7513",
        email: "info@molendesports.co.za",
      },
      socialMedia: {
        whatsapp: "WhatsApp",
        instagram: "Instagram",
      },
      copyright: "© {year} Molende Sports (Pty) Ltd. All rights reserved.",
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
    <footer className="bg-[#000000] text-gray-300 py-10 px-[130px]">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        
        {/* Left Section: Logo */}
        <div className="flex flex-col items-center lg:items-start">
          <Image
            src="/LDB Logo.png"
            alt={translations.footer.logoAlt}
            width={300}
            height={300}
            quality={100}
            unoptimized={true}
            priority
            className="w-28 md:w-52"
          />
        </div>

        {/* Center Section: Navigation Icons */}
        <div className="flex flex-row items-center space-x-6 my-6 lg:my-0">
          {/* Home */}
          <div className="flex flex-col items-center">
            <Link href="/" className="hover:text-[#e89117] text-2xl">
              <FaHouseUser />
            </Link>
            <span className="text-sm mt-1">Home</span>
          </div>
          <span className="text-gray-600">|</span>

          {/* About */}
          <div className="flex flex-col items-center">
            <Link href="/about" className="hover:text-[#e89117] text-2xl">
              <FaInfoCircle />
            </Link>
            <span className="text-sm mt-1">About</span>
          </div>
          <span className="text-gray-600">|</span>

          {/* Members */}
          <div className="flex flex-col items-center">
            <Link href="/members" className="hover:text-[#e89117] text-2xl">
              <FaUsers />
            </Link>
            <span className="text-sm mt-1">Members</span>
          </div>
          <span className="text-gray-600">|</span>

          {/* Services */}
          <div className="flex flex-col items-center">
            <Link href="/services" className="hover:text-[#e89117] text-2xl">
              <FaConciergeBell />
            </Link>
            <span className="text-sm mt-1">Services</span>
          </div>
          <span className="text-gray-600">|</span>

          {/* Contact */}
          <div className="flex flex-col items-center">
            <Link href="/contact" className="hover:text-[#e89117] text-2xl">
              <FaEnvelope />
            </Link>
            <span className="text-sm mt-1">Contact</span>
          </div>
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
              href="https://wa.me/27737487513?text=I%20am%20interested%20in%20your%20services"
              className="text-xl text-gray-300 hover:text-green-400"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://www.instagram.com/ldb.tutors?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              className="text-xl text-gray-300 hover:text-pink-400"
            >
              <FaInstagram />
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
