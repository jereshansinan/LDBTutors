"use client";
import { useState } from "react";

const imageSources = [
  "/hero2.jpg",
  "/hero3.jpg",
  "/home.jpg",
];

export default function WhyChooseUs() {
  const [current, setCurrent] = useState(0);

  const prevImage = () =>
    setCurrent((prev) => (prev === 0 ? imageSources.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrent((prev) => (prev === imageSources.length - 1 ? 0 : prev + 1));

  return (
    <section className="relative px-2 md:px-20 py-6 md:py-6 bg-black" id="gallery">
      <h1 className="text-4xl md:text-6xl font-bold text-white mt-10 mb-10 text-center">
        Our Features
      </h1>
      <div className="relative w-full h-[40vh] md:h-[80vh] flex items-center justify-center">
        <img
          alt={`Gallery ${current}`}
          className="object-cover w-full h-full rounded-3xl shadow-xl transition-all duration-700 ease-in-out"
          src={imageSources[current]}
          style={{
            maxHeight: "80vh",
            maxWidth: "100vw",
          }}
        />
        <button
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-3 shadow-lg hover:bg-black/80 transition"
          onClick={prevImage}
        >
          <svg
            fill="none"
            height={24}
            stroke="currentColor"
            strokeWidth={2}
            width={24}
          >
            <path
              d="M15 19l-7-7 7-7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-3 shadow-lg hover:bg-black/80 transition"
          onClick={nextImage}
        >
          <svg
            fill="none"
            height={24}
            stroke="currentColor"
            strokeWidth={2}
            width={24}
          >
            <path
              d="M9 5l7 7-7 7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
