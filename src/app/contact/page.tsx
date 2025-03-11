"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Lenis from "@/components/lenis";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    service: "",
    status: "Amateur",
    message: "",
  });

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
          phone: "+ 27 Phone Number",
          service: "Select a Service",
          status: "Status",
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
      body: JSON.stringify(formData),
    });

    const result = await res.json();
    setLoading(false);
    setResponseMessage(result.message || translations.contactPage.form.successMessage);
  };

  return (
    <Lenis>
      <Navbar />
      <Hero media={"/home.jpg"} heading={translations.contactPage.heroHeading} />
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

            {/* Service */}
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379]"
            >
              <option value="" disabled selected>
                {translations.contactPage.form.fields.service}
              </option>
              {translations.contactPage.form.serviceOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Status */}
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379]"
            >
              {translations.contactPage.form.statusOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>
              ))}
            </select>

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
              className="w-full bg-[#75E379] text-white py-3 rounded-md font-semibold hover:bg-[#89dd8c] transition duration-300"
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

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-0 h-full">
          <div className="relative w-full lg:h-[700px]">
            {" "}
            {/* Ensure height */}
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