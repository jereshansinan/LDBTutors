import Image from "next/image";

const services = [
  {
    title: "Expert Coaches",
    description: "Years of experience in strength training, rehabilitation, and sport-specific skills.",
    image: "/base.jpg",
  },
  {
    title: "Tailored Programs",
    description: "Programs are customized to meet the unique needs of athletes at any level.",
    image: "/base.jpg",
  },
  {
    title: "Advanced Recovery Solutions",
    description: "Keeping athletes injury-free and performing at their best.",
    image: "/base.jpg",
  },
  {
    title: "Flexible Scheduling",
    description: "Sessions are available both on-site and virtually to fit athletes' schedules.",
    image: "/base.jpg",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-8 md:py-16 px-0 md:px-8 bg-white">
      <div className="mx-auto w-full max-w-[calc(100%-20px)] md:max-w-[calc(100%-260px)]">
        {/* Centered Paragraph */}
        <p className="text-left text-xs sm:text-sm md:text-2xl mx-auto text-gray-700 mb-6 md:mb-8 font-body">
          Molende Sports is a performance-focused training facility designed to maximize athlete potential through tailored coaching, recovery solutions, and nutrition guidance. We specialize in off-season training, personalized fitness tracking, and sport-specific skill development for athletes aiming for high performance
        </p>

        <h2 className="text-xl md:text-4xl font-bold text-center mb-8 md:mb-12 font-heading">
          Why Choose Us
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden cursor-pointer"
            >
              {/* Background Image */}
              <Image
                src={service.image}
                alt={service.title}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-500 transform group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 group-hover:bg-[#75E379] transition-all duration-500 flex items-center justify-center text-white text-center p-4">
                <div className="transition-opacity duration-500">
                  <h3 className="text-2xl font-bold group-hover:mb-2 font-heading group-hover:text-black">
                    {service.title}
                  </h3>
                  <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 font-body text-black text-xs sm:text-sm md:text-2xl">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>


  );
}
