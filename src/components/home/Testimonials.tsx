"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [translations, setTranslations] = useState({
    testimonials: {
      title: "Testimonials",
      athleteA: {
        name: "Athlete A",
        position: "Trainee",
        text: "Molende Sports took my training to the next level. The attention to detail and personalized approach made a real difference in my performance!",
      },
      athleteB: {
        name: "Athlete B",
        position: "Trainee",
        text: "Thanks to Molende’s recovery and nutrition programs, I was able to get back on the field faster than expected!",
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

  const testimonials = [
    {
      name: translations.testimonials.athleteA.name,
      position: translations.testimonials.athleteA.position,
      text: translations.testimonials.athleteA.text,
      image: "/testimonial.jpg",
      profileImage: "/Quote Left.png",
    },
    {
      name: translations.testimonials.athleteB.name,
      position: translations.testimonials.athleteB.position,
      text: translations.testimonials.athleteB.text,
      image: "/testim2.jpg",
      profileImage: "/Quote Left.png",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="pb-16 px-0 md:px-8 flex flex-col items-center justify-center">
      <h2 className="text-xl md:text-4xl font-bold text-center mb-8 md:mb-12">
        {translations.testimonials.title}
      </h2>

      <div className="relative mx-auto w-full max-w-[calc(100%-20px)] md:max-w-[calc(100%-260px)] h-[500px]">
        {/* Background Image */}
        <Image
          src={testimonials[currentTestimonial].image}
          alt="Testimonial"
          layout="fill"
          objectFit="cover"
          className="rounded-lg shadow-lg"
        />

        {/* Testimonial Card */}
        <div className="absolute bottom-6 right-6 bg-[#75E379] p-2 md:p-8 rounded-lg shadow-xl w-[85%] md:w-[600px] lg:w-[700px] h-[40%] md:min-h-[80%] flex flex-col justify-between">
          {/* Top Section: Image & Counter */}
          <div className="flex justify-between items-center">
            {/* Small Image (Profile Picture) */}
            <Image
              src={testimonials[currentTestimonial].profileImage}
              alt={testimonials[currentTestimonial].name}
              width={50}
              height={50}
              className="rounded-full"
            />

            {/* Counter */}
            <p className="text-black text-xs md:text-xl">
              {currentTestimonial + 1} / {testimonials.length}
            </p>
          </div>

          {/* Testimonial Text */}
          <p className="text-black text-xs md:text-xl font-bold leading-relaxed mt-2 md:mt-4 flex-1">
            {testimonials[currentTestimonial].text}
          </p>

          {/* Bottom Section: Name & Navigation Buttons */}
          <div className="flex justify-between items-center mt-1 md:mt-6">
            {/* Name & Position */}
            <div>
              <h4 className="font-semibold text-xs md:text-xl">
                {testimonials[currentTestimonial].name}
              </h4>
              <p className="text-xs md:text-sm text-black">
                {testimonials[currentTestimonial].position}
              </p>
            </div>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button
                onClick={prevTestimonial}
                className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                <FaChevronLeft className="text-black text-[8px] md:text-lg" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-3 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                <FaChevronRight className="text-black text-[8px] md:text-lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}