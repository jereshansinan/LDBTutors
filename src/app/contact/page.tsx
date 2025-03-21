"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
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
    status: "",
    position: "",
    skills: "",
    message: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set(["I would like to work:"])
  );

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", "),
    [selectedKeys]
  );

  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

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
          "Field Training",
          "Strength & Conditioning",
          "Standard Package",
          "Elite Package",
          "Athlete Assessment and Profiling",
          "Online Training Program",
          "Injury Assessment + FMS Assessment",
          "Lifestyle Assessment",
          "Rehabilitation",
          "Recovery",
        ],
        statusOptions: ["Amateur", "Semi-Professional", "Professional"],
        positionOptions: ["Goalkeeper", "Defender", "Midfielder", "Forward"],
        skillOptions: [
          "First Touch",
          "Driving the Ball",
          "Heading",
          "Moving",
          "Finishing",
          "Athletic Performance",
        ],
        submitButton: "Send Message",
        loadingText: "Sending...",
        successMessage: "Thank you! Your message has been sent.",
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
      <Navbar />
      <Hero
        media={"/home.jpg"}
        heading={translations.contactPage.heroHeading}
      />
      <section className="flex flex-col lg:flex-row justify-between px-0 md:px-[130px] pt-10 md:pt-10 pb-4 md:pb-8">
        {/* Left Section - Contact Form */}
        <div className="w-full lg:w-1/2 space-y-6 px-6">
          <h2 className="text-xl md:text-4xl font-bold">
            {translations.contactPage.form.heading}
          </h2>
          <p className="text-base md:text-xl text-gray-600">
            {translations.contactPage.form.description}
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-lg bg-transparent"
          >
            {/* Full Name */}
            <input
              type="text"
              name="fullName"
              placeholder={translations.contactPage.form.fields.fullName}
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379]"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder={translations.contactPage.form.fields.email}
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379]"
            />

            {/* Phone Number */}
            <input
              type="tel"
              name="phone"
              placeholder={translations.contactPage.form.fields.phone}
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379]"
            />

            {/* Service Dropdown */}
            <div className="relative w-full">
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379] appearance-none bg-white text-left"
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
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 9l-7.5 7.5L4.5 9"
                  />
                </svg>
              </span>
            </div>

            {/* Position Dropdown */}
            <div className="relative w-full">
              <select
                name="position"
                value={formData.position}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379] appearance-none bg-white text-left"
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
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 9l-7.5 7.5L4.5 9"
                  />
                </svg>
              </span>
            </div>

            {/* Status */}
            {/* Status Dropdown */}
            <div className="relative w-full">
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379] appearance-none bg-white text-left"
              >
                <option value="" disabled>
                  {translations.contactPage.form.fields.status}
                </option>
                {translations.contactPage.form.statusOptions.map(
                  (option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  )
                )}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 9l-7.5 7.5L4.5 9"
                  />
                </svg>
              </span>
            </div>

            {/* Multi-Select Skills Dropdown */}
            <Dropdown className="w-full">
              <DropdownTrigger>
                <Button
                  className="w-full flex justify-between items-center p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379] bg-white text-left capitalize"
                  variant="bordered"
                >
                  {selectedValue || translations.contactPage.form.fields.skills}
                  <span className="ml-2 text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19.5 9l-7.5 7.5L4.5 9"
                      />
                    </svg>
                  </span>
                </Button>
              </DropdownTrigger>

              <DropdownMenu
                disallowEmptySelection
                aria-label="Multiple selection example"
                closeOnSelect={false}
                selectedKeys={selectedKeys}
                selectionMode="multiple"
                variant="flat"
                onSelectionChange={setSelectedKeys}
                className="w-full md:w-72 bg-white border border-gray-300 rounded-md shadow-md capitalize"
              >
                {translations.contactPage.form.skillOptions.map((skill) => {
                  const skillKey = skill.toLowerCase().replace(/\s+/g, " ");
                  const isSelected =
                    Array.from(selectedKeys).includes(skillKey); // ✅ Fix for `.has()`

                  return (
                    <DropdownItem
                      key={skillKey}
                      className="p-3 flex flex-row justify-between items-center text-left hover:bg-gray-100 capitalize w-full"
                    >
                      <span className="flex-grow">
                        {skill}{" "}
                        {isSelected && (
                          <span className="text-green-500">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </span>
                        )}
                      </span>
                    </DropdownItem>
                  );
                })}
              </DropdownMenu>
            </Dropdown>

            {/* Message */}
            <textarea
              name="message"
              placeholder={translations.contactPage.form.fields.message}
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379]"
            ></textarea>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#75E379] text-black py-3 rounded-md font-semibold hover:bg-black hover:text-white transition duration-300"
              disabled={loading}
            >
              {loading
                ? translations.contactPage.form.loadingText
                : translations.contactPage.form.submitButton}
            </button>
          </form>
          {/* Response Message */}
          {responseMessage && (
            <p className="text-center text-[#75E379] mt-2">{responseMessage}</p>
          )}
        </div>

        {/* Right Section - Image */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-0 h-full">
          <div className="relative w-full lg:h-[900px]">
            {" "}
            <Image
              src="/contact.jpg"
              alt="Contact Us"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      <Footer />
    </Lenis>
  );
}
