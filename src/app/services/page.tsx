import React from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// --- Types & Dummy Data ---
type Service = {
  id: number;
  title: string;
  description: string;
  price: string;
  image: string;
  includes: string[];
  groupTraining?: {
    [sessions: number]: string;
  };
};

const services: Service[] = [
  {
    id: 1,
    title: "Service 1",
    description:
      "This is a detailed description for service 1. It provides more information and makes the column longer.",
    price: "$100",
    image: "/base.jpg",
    includes: ["Feature A", "Feature B", "Feature C"],
    groupTraining: {
      4: "$350",
      8: "$600",
      12: "$800",
    },
  },
  {
    id: 2,
    title: "Service 2",
    description:
      "This is a detailed description for service 2. It provides more information and makes the column longer.",
    price: "$120",
    image: "/base.jpg",
    includes: ["Feature D", "Feature E", "Feature F"],
    groupTraining: {
      4: "$400",
      8: "$700",
      12: "$900",
    },
  },
  {
    id: 3,
    title: "Service 3",
    description:
      "This is a detailed description for service 3. It provides more information and makes the column longer.",
    price: "$90",
    image: "/base.jpg",
    includes: ["Feature G", "Feature H"],
  },
  {
    id: 4,
    title: "Service 4",
    description:
      "This is a detailed description for service 4. It provides more information and makes the column longer.",
    price: "$110",
    image: "/base.jpg",
    includes: ["Feature I", "Feature J", "Feature K"],
  },
];

type OtherService = {
  id: number;
  title: string;
  price: string;
};

const otherServices: OtherService[] = [
  { id: 1, title: "Other Service 1", price: "$50" },
  { id: 2, title: "Other Service 2", price: "$60" },
  { id: 3, title: "Other Service 3", price: "$70" },
  { id: 4, title: "Other Service 4", price: "$80" },
  { id: 5, title: "Other Service 5", price: "$90" },
  { id: 6, title: "Other Service 6", price: "$100" },
];

// --- Main Component ---
export default function Services() {
  return (
    <div>
      <Navbar />
      <Hero media={"/base.jpg"} heading="Our Services"/>

      {/* Main Content with 130px left/right padding */}
      <div className="px-2 md:px-[130px] py-8">
        {/* Page Heading */}
        <div className="mb-2 md:mb-12">
          <h1 className="text-center text-xl md:text-4xl font-bold mb-4">Our Services</h1>
          <p className="text-left md:text-center text-base md:text-xl text-gray-600">
            We offer a variety of services to cater to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-5 md:mb-12">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="flex flex-col rounded-lg overflow-hidden border"
            >
              {/* Service Image */}
              <div className="relative w-full h-[200px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              {/* Bordered Content Section */}
              <div className="p-2 md:p-6 flex flex-col flex-1">
                <h2 className="text-xl md:text-2xl font-semibold mb-2">
                  {service.title}
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-4">
                  {service.description}
                </p>
                <div className="text-center mb-4">
                  <span className="text-2xl md:text-3xl font-bold">{service.price}</span>
                </div>
                {/* Includes List */}
                <div className="mb-4">
                  {service.includes.map((inc, idx) => (
                    <div key={idx} className="flex items-center mb-1">
                      {/* Green Tick Icon */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-[#75E379] flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="ml-2 text-base md:text-lg">{inc}</span>
                    </div>
                  ))}
                </div>
                {/* Group Training Section for the 1st 2 services */}
                {index < 2 && service.groupTraining && (
                  <div className="mt-auto pt-4 border-t">
                    <h3 className="font-semibold mb-2 text-base md:text-lg">
                      Group Training
                    </h3>
                    <div className="space-y-1 text-base md:text-lg">
                      <div className="flex justify-between">
                        <span>4 sessions</span>
                        <span>{service.groupTraining[4]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>8 sessions</span>
                        <span>{service.groupTraining[8]}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>12 sessions</span>
                        <span>{service.groupTraining[12]}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Other Services Section */}
        <div className="w-full bg-white py-2 md:py-8 px-0 md:px-4 mb-5 md:mb-12 rounded-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            Other Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {otherServices.map((os) => (
              <div
                key={os.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <span className="text-xs md:text-lg">{os.title}</span>
                <span className="text-lg md:text-xl font-bold">{os.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Assessment and Profiling Section */}
        <div className="mb-5 md:mb-12">
          <h2 className="text-xl md:text-4xl font-bold text-center mb-6">
            Assessment and Profiling
          </h2>
          <div className="flex flex-col lg:flex-row items-center gap-8">
            {/* Video on the Left */}
            <div className="flex-1 w-full rounded-lg overflow-hidden">
              <div className="relative w-full pb-[56.25%]">
                <iframe
                  src="https://www.youtube.com/embed/your_video_id"
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                ></iframe>
              </div>
            </div>
            {/* Description on the Right */}
            <div className="flex-1">
              <p className="text-sm md:text-xl text-gray-700 mb-4">
                Our comprehensive assessment and profiling service helps you
                understand your strengths and areas for improvement. Benefit
                from personalized insights and detailed analysis to optimize
                your performance.
              </p>
              <p className="text-sm md:text-xl text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
