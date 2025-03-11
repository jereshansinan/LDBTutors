"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import Lenis from "@/components/lenis";

export default function MembersPage() {
  const Features = [
    {
      name: "EXPERT TEAM",
      description:
        "Our team includes former elite athletes, certified coaches, strength and conditioning experts, nutritionists, biokinetics and sports psychologists-all committed to delivering the best training experience for each athlete.",
      image: "/contact.jpg",
    },
    {
      name: "LEADERSHIP",
      description:
        "A dynamic leadership team and Industry expert partners with deep experience in both sports management and athlete development.",
      image: "/contact.jpg",
    },
    {
      name: "SUPPORT STAFF",
      description:
        "Specialized professionals in rehabilitation, recovery, and performance optimization to ensure every athlete receives the best care.",
      image: "/contact.jpg",
    },
    {
      name: "TRAINING FACILITY AND TECHNOLOGY",
      description:
        "Our state-of-the-art training facilities gives you access to professional level training fields, advanced equipment to monitor and performance, and use of cutting-edge technology in performance assessment and recovery tools to ensure that athletes have the resources they need to excel.",
      image: "/contact.jpg",
    },
  ];

  const members = [
    {
      name: "Henry Nzuzi",
      position: "Founder",
      description: "desc",
      img: "/profile.jpg",
    },
    {
      name: "Damien Kiyombo",
      position: "Co-Founder",
      description: "desc.",
      img: "/profile.jpg",
    },
    {
      name: "Lemuel Challens",
      position: "Co-Founder & Lawyer",
      description: "desc",
      img: "/profile.jpg",
    },
    {
      name: "EDELBERT DINHA",
      position: "Head Coach",
      description:
        "Our Head Coach at Molende Training, is a CAF B licensed coach and a celebrated Orlando Pirates legend. With his deep knowledge of the game and extensive experience, Dinha brings an elite level of professionalism and insight to our training program. \n\nHis background as a former professional and his CAF B certification enable him to design rigorous, high-standard training sessions that prioritize technical skills, tactical understanding, and athletic resilience. Driven by his passion to develop talent. Dinha is dedicated to mentoring young players and professionals alike, helping them excel in elite competition and achieve their dreams on an international level.",
      img: "/profile.jpg",
    },
    {
      name: "JESSE DONN",
      position: "Lifestyle Coach",
      description:
        "As a former professional footballer with over seven years of elite-level experience, Jesse has lived the lifestyle of an athlete, mastering the art of performance optimisation. \n\nHis career has been built on a foundation of precision, dedication, and a relentless pursuit of improvement in every aspect of his training, recovery, nutrition, and mindset. \n\nOver time, Jesse has developed a deep understanding of how the small details - exercise, sleep, nutrition, and supplements, contribute to peak performance. ",
      img: "/profile.jpg",
    },
    {
      name: "RATI GUARAJENA",
      position: "Biokinetic",
      description:
        "Rati leads our team with a passion for helping people achieve their fitness goals. As a qualified biokineticist, she specialises in rehabilitation for injuries and age-related concerns, using exercise to restore movement and strength. \n\nShe also designs personalised training programs for sports performance, helping athletes of all levels improve their skills. \n\nWhether you’re recovering from an injury or looking to boost your fitness, RaTi is dedicated to guiding you every step of the way toward better health and physical independence.",
      img: "/profile.jpg",
    },
    {
      name: "BRYDEN CABRAL",
      position: "Strength And Conditioning",
      description: "Creative mastermind.",
      img: "/profile.jpg",
    },
    {
      name: "SIOBAN STANDER",
      position: "Strength And Conditioning",
      description: "Team motivator.",
      img: "/profile.jpg",
    },
  ];

  return (
    <Lenis>
      <Navbar />
      <Hero media={"/home.jpg"} heading="Our Team" />
      <section className="py-8 px-2 md:px-[130px]">

        {/* Feature Sections */}
        {Features.map((item, index) => (
          <section key={index} className="relative w-full">
            {/* Background that fills the screen width */}
            <div
              className={`absolute inset-0 ${
                index % 2 === 0 ? "bg-gray-100" : "bg-[#75E379]"
              }`}
            ></div>

            {/* Content inside with proper padding */}
            <div className="relative z-10 flex flex-col md:flex-row items-center py-16">
              {/* Image on alternating sides */}
              {index % 2 !== 0 && (
                <div className="w-full md:w-1/2 flex justify-center mb-8 md:mb-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={600}
                    height={600}
                    className="rounded-lg object-cover shadow-lg aspect-square"
                  />
                </div>
              )}

              {/* Text Content */}
              <div className="w-full md:w-1/2 text-center md:text-left px-6 md:px-[130px]">
                <h3 className="text-xl md:text-4xl font-semibold mb-6">
                  {item.name}
                </h3>
                <p className="text-base md:text-2xl text-black leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Image on alternating sides */}
              {index % 2 === 0 && (
                <div className="w-full md:w-1/2 flex justify-center mt-8 md:mt-0">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={600}
                    height={600}
                    className="rounded-lg object-cover shadow-lg aspect-square"
                  />
                </div>
              )}
            </div>
          </section>
        ))}

        <div className="mb-2 md:mb-12">
          <h1 className="text-center text-xl md:text-4xl font-bold mb-4 mt-4">
            Our Team
          </h1>
        </div>

        {/* Team Members Section */}
        <div className="mt-12 grid md:grid-cols-1 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="flex flex-col md:flex-row items-center bg-gray-100 rounded-lg p-8 shadow-lg transition-all duration-300 hover:bg-[#75E379]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Profile Image */}
              <Image
                src={member.img}
                alt={member.name}
                width={500}
                height={500}
                className="rounded-lg object-cover border-2 border-gray-300 aspect-square"
              />

              {/* Name, Position, and Description */}
              <div className="ml-6 text-center md:text-left">
                <h3 className="text-lg md:text-3xl font-semibold">
                  {member.name}
                </h3>
                <p className="text-base md:text-2xl text-gray-600">
                  {member.position}
                </p>
                <p className="text-base md:text-2xl mt-2 whitespace-pre-line">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <Footer />
    </Lenis>
  );
}
