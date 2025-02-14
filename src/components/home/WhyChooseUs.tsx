import Image from "next/image";

const services = [
  {
    title: "Quality Assurance",
    description: "We ensure the highest standards in everything we do.",
    image: "/images/quality.jpg",
  },
  {
    title: "Expert Team",
    description: "Our team consists of highly skilled professionals.",
    image: "/images/team.jpg",
  },
  {
    title: "Customer Support",
    description: "24/7 support to assist you anytime, anywhere.",
    image: "/images/support.jpg",
  },
  {
    title: "Innovative Solutions",
    description: "We use cutting-edge technology to solve problems.",
    image: "/images/innovation.jpg",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 px-8 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">Why Choose Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {services.map((service, index) => (
          <div
            key={index}
            className="relative group w-full h-[300px] md:h-[350px] rounded-lg overflow-hidden cursor-pointer"
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
            <div className="absolute inset-0 bg-black/50 group-hover:bg-green-600/90 transition-all duration-500 flex items-center justify-center text-white text-center p-4">
              <div className="transition-opacity duration-500">
                <h3 className="text-2xl font-bold group-hover:mb-2">{service.title}</h3>
                <p className="opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {service.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
