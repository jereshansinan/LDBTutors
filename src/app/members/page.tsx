"use client";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";

export default function MembersPage() {
  const Features = [
    {
      name: "EXPERT TEAM",
      description:
        "Our team includes former elite athletes, certified coaches, strength and conditioning experts, nutritionists, biokinetics and sports psychologists-all committed to delivering the best training experience for each athlete.",
    },
    {
      name: "LEADERSHIP",
      description:
        "A dynamic leadership team and Industry expert partners with deep experience in both sports management and athlete development.",
    },
    {
      name: "SUPPORT STAFF",
      description:
        "Specialized professionals in rehabilitation, recovery, and performance optimization to ensure every athlete receives the best care.",
    },
    {
      name: "TRAINING FACILITY AND TECHNOLOGY",
      description:
        "Our state-of-the-art training facilities gives you access to professional level training fields, advanced equipment to monitor and performance, and use of cutting-edge technology in performance assessment and recovery tools to ensure that athletes have the resources they need to excel.",
    },
  ];

  const members = [
    {
      name: "Henry Nzuzi",
      position: "Founder",
      description: "desc",
      img: "/base.jpg",
    },
    {
      name: "Damien Kiyombo",
      position: "Co-Founder",
      description: "desc.",
      img: "/base.jpg",
    },
    {
      name: "Lemuel Challens",
      position: "Co-Founder & Lawyer",
      description: "desc",
      img: "/base.jpg",
    },
    {
      name: "EDELBERT DINHA",
      position: "Head Coach",
      description:
        "Our Head Coach at Molende Training, is a CAF B licensed coach and a celebrated Orlando Pirates legend. With his deep knowledge of the game and extensive experience, Dinha brings an elite level of professionalism and insight to our training program. \n\nHis background as a former professional and his CAF B certification enable him to design rigorous, high-standard training sessions that prioritize technical skills, tactical understanding, and athletic resilience. Driven by his passion to develop talent. Dinha is dedicated to mentoring young players and professionals alike, helping them excel in elite competition and achieve their dreams on an international level.",
      img: "/base.jpg",
    },
    {
      name: "JESSE DONN",
      position: "Lifestyle Coach",
      description:
        "As a former professional footballer with over seven years of elite-level experience, Jesse has lived the lifestyle of an athlete, mastering the art of performance optimisation. \n\nHis career has been built on a foundation of precision, dedication, and a relentless pursuit of improvement in every aspect of his training, recovery, nutrition, and mindset. \n\nOver time, Jesse has developed a deep understanding of how the small details - exercise, sleep, nutrition, and supplements, contribute to peak performance. ",
      img: "/base.jpg",
    },
    {
      name: "RATI GUARAJENA",
      position: "Biokinetic",
      description:
        "Rati leads our team with a passion for helping people achieve their fitness goals. As a qualified biokineticist, she specialises in rehabilitation for injuries and age-related concerns, using exercise to restore movement and strength. \n\nShe also designs personalised training programs for sports performance, helping athletes of all levels improve their skills. \n\nWhether you’re recovering from an injury or looking to boost your fitness, RaTi is dedicated to guiding you every step of the way toward better health and physical independence.",
      img: "/base.jpg",
    },
    {
      name: "BRYDEN CABRAL",
      position: "Strength And Conditioning",
      description: "Creative mastermind.",
      img: "/base.jpg",
    },
    {
      name: "SIOBAN STANDER",
      position: "Strength And Conditioning",
      description: "Team motivator.",
      img: "/base.jpg",
    },
  ];

  return (
    <div>
      <Navbar />
      <Hero media={"/home.jpg"} heading="Members" />
      <section className="px-2 md:px-[130px] py-8">
        <div className="mb-2 md:mb-12">
          <h1 className="text-center text-xl md:text-4xl font-bold mb-4">
            Our Members
          </h1>
          <p className="text-left md:text-center text-base md:text-xl text-gray-600">
            description
          </p>
        </div>

        {/* 4 Feature Blocks in 1 Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {Features.map((item, index) => (
            <motion.div
              key={index}
              className="relative group w-full h-[200px] md:h-[600px] rounded-lg overflow-hidden cursor-pointer bg-gray-100 p-4 flex flex-col transition-all duration-300 hover:bg-[#75E379] shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h3 className="font-semibold text-sm md:text-2xl">{item.name}</h3>
              <p className="text-gray-600 group-hover:text-black text-sm md:text-2xl">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Team Members in 2 Columns */}
        <div className="mt-12 grid md:grid-cols-1 gap-6">
          {members.map((member, index) => (
            <motion.div
              key={index}
              className="flex items-center bg-gray-100 rounded-lg p-6 shadow-lg transition-all duration-300 hover:bg-[#75E379]"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Profile Image on the Left */}
              <Image
                src={member.img}
                alt={member.name}
                width={150}
                height={150}
                className="rounded-lg object-cover w-[400px] h-full border-2 border-gray-300"
              />

              {/* Name, Position, and Description on the Right */}
              <div className="ml-6 text-center md:text-left">
                <h3 className="text-sm md:text-2xl font-semibold">
                  {member.name}
                </h3>
                <p className="text-sm md:text-2xl text-gray-600">
                  {member.position}
                </p>
                <p className="text-sm md:text-2xl mt-2 whitespace-pre-line">
                  {member.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
