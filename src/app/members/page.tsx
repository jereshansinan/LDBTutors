import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function MembersPage() {
  return (
    <div>
      <Navbar />
      <Hero media={"/base.jpg"} heading="Contact Us" />
      <section className="px-2 md:px-[130px] py-8">
        {/* Page Heading */}
        <div className="mb-2 md:mb-12">
          <h1 className="text-center text-xl md:text-4xl font-bold mb-4">
            Our Members
          </h1>
          <p className="text-left md:text-center text-base md:text-xl text-gray-600">
            description
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
