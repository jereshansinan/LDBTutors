import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function About() {
  return (
    <div>
      <Navbar />
      <Hero media={"/home.jpg"} heading="About Us" />
      <div className="w-full md:px-[130px]">
        {/* Who We Are Section */}
        <section className="py-2  md:py-10 display flex justify-between">
          <div className="hidden md:flex flex-col gap-4 w-1/4 text-gray-500 text-sm md:text-xl font-semibold">
            <p>Who We Are</p>
            <p>Our Mission</p>
            <p>Our Vision</p>
          </div>
          <div className="w-full md:w-[calc(100% - 422px)] px-2 md:px-0">
            <h2 className="text-xl md:text-4xl font-bold mb-4 md:text-left text-center font-heading">
              Who We Are
            </h2>
            <p className="text-gray-700 text-sm md:text-2xl md:text-left leading-relaxed font-body mb-4">
              Molende Sports is a player development and management company
              dedicated to nurturing football talent in Africa. Through its
              Molende Training Program, it offers specialized training services,
              including fieldwork, strength & conditioning, rehab, and sports
              assessments. The company collaborates with top coaches,
              biokineticists, and performance specialists to help players reach
              professional levels.
            </p>
            <p className="text-gray-700 text-sm md:text-2xl md:text-left leading-relaxed font-body mb-4">
              Additionally, Molende Management represents and guides players in
              their careers, securing opportunities locally and internationally
              through strategic partnerships with clubs, agencies, and
              organizations like Imbondeiro.
            </p>
            <p className="text-gray-700 text-sm md:text-2xl md:text-left leading-relaxed font-body">
              With a strong focus on holistic player development, Molende Sports
              ensures athletes are physically, mentally, and tactically prepared
              for the demands of professional football.
            </p>
          </div>
        </section>

        {/* Large Image Section with Proper Scaling */}
        <div className="w-full p-2 md:p-0 relative h-40 md:h-72 lg:h-96 rounded-2xl overflow-hidden">
          <Image
            src="/whoweare.jpg"
            alt="Our Work"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>

        {/* Alternating Grid Sections */}
        <section className="py-5 md:py-10 mx-auto grid gap-5 md:gap-10 px-2 md:px-0">
          {/* First Grid Item - Image on Right */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-xl md:text-4xl font-bold text-[#75E379] font-heading mb-2 md:mb-4">
                Our Mission
              </h2>
              <p className="text-gray-700 text-sm md:text-2xl leading-relaxed font-body">
                To empower athletes with tailored training and recovery
                programs, ensuring they perform at their peak while preventing
                injuries and optimizing recovery time.
              </p>
            </div>
            <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden order-1 md:order-2">
              <Image
                src="/mission.jpg"
                alt="First Section"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
          </div>

          {/* Second Grid Item - Image on Left */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-20 items-center">
            <div className="relative w-full h-72 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="/vision.jpg"
                alt="Second Section"
                layout="fill"
                objectFit="cover"
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-xl md:text-4xl font-bold mb-2 md:mb-4 text-[#75E379]">
                Our Vision
              </h2>
              <p className="text-gray-700 text-sm md:text-2xl leading-relaxed">
                To revolutionize the way athletes train, recover, and perform by
                offering holistic, science-backed solutions that go beyond
                traditional training.
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
