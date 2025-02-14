import Hero from "@/components/home/Hero";
import StatisticsBar from "@/components/home/StatisticsBar";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <StatisticsBar />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </div>
  );
}
