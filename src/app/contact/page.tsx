"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Lenis from "@/components/lenis";
import React from "react";
import type { Selection } from "@heroui/react";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@heroui/react";

export default function ContactPage() {
  const initialFormData = {
    fullName: "",
    email: "",
    phone: "",
    service: "",
    position: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [translations, setTranslations] = useState({
    contactPage: {
      heroHeading: "Contact Us",
      form: {
        heading: "Let's Connect",
        description:
          "We’d love to hear from you. Fill out the form below and we’ll be in touch soon.",
        fields: {
          fullName: "Full Name",
          email: "Email",
          phone: "+27 Phone Number",
          service: "Select a Service",
          status: "Status",
          position: "Select a Position",
          skills: "I would like to work on",
          message: "Your Message",
        },
        serviceOptions: [
          "Afrikaans Lessons",
          "English Lessons",
          "Pure Maths Lessons",
          "Math Lit Lessons",
          "History Lessons",
          "Geography Lessons",
          "Physics Lessons",
          "Chemistry Lessons",
        ],
        positionOptions: ["Tutor/Teacher", "Student"],
        submitButton: "Send Message",
        loadingText: "Sending...",
        successMessage: "Thank you! Your message has been sent.",
      },
    },
  });

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );

  const selectedValue = React.useMemo(() => {
    const items = Array.from(selectedKeys);
    if (items.length === 0) return ""; // Handle empty array case

    const firstItem = String(items[0]).replace(/,$/, "");
    return `${translations.contactPage.form.fields.skills}${firstItem}${
      items.length > 1 ? `, ${items.slice(1).join(", ")}` : ""
    }`;
  }, [selectedKeys, translations]);

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    const language = localStorage.getItem("language") || "en";
    fetch(`/locales/${language}.json`)
      .then((response) => response.json())
      .then((data) => setTranslations(data))
      .catch((error) => console.error("Error loading translations:", error));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setResponseMessage("");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData, skills: selectedValue }),
    });

    const result = await res.json();
    setLoading(false);
    setResponseMessage(
      result.message || translations.contactPage.form.successMessage
    );
    setFormData(initialFormData);
    setSelectedKeys(new Set());
  };

  return (
    <Lenis>
      <div className="bg-black min-h-screen text-white">
        <Navbar />

        {/* This is the main content section. Added pt-20 to push content down. */}
        <section className="flex flex-col lg:flex-row justify-center px-6 md:px-[130px] pt-20 pb-4 md:pb-8">
          <div className="w-full lg:w-2/5 space-y-6">
            <h2 className="text-xl md:text-4xl font-bold">
              {translations.contactPage.form.heading}
            </h2>
            <p className="text-base md:text-xl text-gray-300">
              {translations.contactPage.form.description}
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-lg bg-transparent"
            >
              <input
                type="text"
                name="fullName"
                placeholder={translations.contactPage.form.fields.fullName}
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#75E379]"
              />

              <input
                type="email"
                name="email"
                placeholder={translations.contactPage.form.fields.email}
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#75E379]"
              />

              <input
                type="tel"
                name="phone"
                placeholder={translations.contactPage.form.fields.phone}
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#75E379]"
              />

              <div className="relative w-full">
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#75E379] appearance-none"
                >
                  <option value="" disabled>
                    {translations.contactPage.form.fields.service}
                  </option>
                  {translations.contactPage.form.serviceOptions.map(
                    (option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  ▼
                </span>
              </div>

              <div className="relative w-full">
                <select
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#75E379] appearance-none"
                >
                  <option value="" disabled>
                    {translations.contactPage.form.fields.position}
                  </option>
                  {translations.contactPage.form.positionOptions.map(
                    (option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                  ▼
                </span>
              </div>

              <textarea
                name="message"
                placeholder={translations.contactPage.form.fields.message}
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-600 rounded-md bg-black text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#75E379]"
              ></textarea>

              <button
                type="submit"
                className="w-full bg-[#e89117] text-black py-3 rounded-md font-semibold hover:bg-black hover:text-white transition duration-300"
                disabled={loading}
              >
                {loading
                  ? translations.contactPage.form.loadingText
                  : translations.contactPage.form.submitButton}
              </button>
            </form>

            {responseMessage && (
              <p className="text-center text-[#75E379] mt-2">
                {responseMessage}
              </p>
            )}
          </div>

          <div className="w-full lg:w-3/5 flex justify-center lg:justify-start mt-0">
            <div className="relative w-full h-[600px]">
              <Image
                src="/contact.jpg"
                alt="Contact Us"
                layout="fill"
                objectFit="contain"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </Lenis>
  );
}