/* eslint-disable react/no-unescaped-entities */
"use client";
import { useState } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

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
    setResponseMessage(result.message);
  };

  return (
    <div>
      <Navbar />
      <Hero media={"/base.jpg"} heading="Contact Us" />
      <section className="flex flex-col lg:flex-row justify-between px-0 md:px-[130px] pt-10 md:pt-10 pb-4 md:pb-8">
        {/* Left Section - Contact Form */}
        <div className="w-full lg:w-1/2 space-y-6 px-6">
          <h2 className="text-xl md:text-4xl font-bold">Let's Connect</h2>
          <p className="text-base md:text-xl text-gray-600">
            We’d love to hear from you. Fill out the form below and we’ll be in
            touch soon.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 rounded-lg bg-transparent"
          >
            {/* Full Name */}
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379]"
            />

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379]"
            />

            {/* Phone Number */}
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
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
                Select a Service
              </option>
              <option value="Field Training">Field Training</option>
              <option value="Strength & Conditioning">Strength & Conditioning</option>
              <option value="Standard Package">Standard Package</option>
              <option value="Elite Package">Elite Package</option>
              <option value="Athlete Assessment and Profiling">Athlete Assessment and Profiling</option>
              <option value="Online Training Program">Online Training Program</option>
              <option value="Injury Assessment + FMS Assessment">Injury Assessment + FMS Assessment</option>
              <option value="Lifestyle Assessment">Lifestyle Assessment</option>
              <option value="Rehabilitation">Rehabilitation</option>
              <option value="Recovery">Recovery</option>
            </select>

            {/* Status */}
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#75E379]"
            >
              <option value="Amateur">Amateur</option>
              <option value="Semi-Professional">Semi-Professional</option>
              <option value="Professional">Professional</option>
            </select>

            {/* Message */}
            <textarea
              name="message"
              placeholder="Your Message"
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
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Response Message */}
          {responseMessage && (
            <p className="text-center text-[#75E379] mt-2">{responseMessage}</p>
          )}
        </div>

        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-0 h-full">
          <div className="relative w-full lg:h-[750px]">
            {" "}
            {/* Ensure height */}
            <Image
              src="/base.jpg"
              alt="Contact Us"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
