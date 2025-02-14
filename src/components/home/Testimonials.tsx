"use client";
import { useState } from "react";
import Image from "next/image";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    position: "CEO of TechCorp",
    text: "This company provided exceptional service! Highly recommend.",
    image: "/images/testimonial-bg1.jpg",
  },
  {
    name: "Sarah Johnson",
    position: "Marketing Manager",
    text: "Amazing experience! Their team is professional and efficient.",
    image: "/images/testimonial-bg2.jpg",
  },
  {
    name: "Michael Smith",
    position: "Entrepreneur",
    text: "Their innovative solutions helped my business grow significantly.",
    image: "/images/testimonial-bg3.jpg",
  },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section className="py-16 px-8 flex flex-col items-center justify-center">
      <h2 className="text-4xl font-bold text-center mb-12">Testimonials</h2>

      <div className="relative w-full max-w-4xl h-[450px]">
        {/* Background Image */}
        <Image
          src={testimonials[currentTestimonial].image}
          alt="Testimonial"
          layout="fill"
          objectFit="cover"
          className="rounded-2xl shadow-lg"
        />

        {/* Testimonial Card */}
        <div className="absolute bottom-6 right-6 bg-white p-6 rounded-lg shadow-xl w-[300px] md:w-[350px]">
          <p className="text-gray-700 italic">
            {testimonials[currentTestimonial].text}
          </p>
          <h4 className="font-semibold mt-3">{testimonials[currentTestimonial].name}</h4>
          <p className="text-sm text-gray-500">{testimonials[currentTestimonial].position}</p>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
