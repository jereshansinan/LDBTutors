
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function About() {
    return (
        <div>
            <Navbar />
            <Hero media={"/base.jpg"} heading="About Us"/>
            <div className="w-full md:px-[130px]">
                {/* Who We Are Section */}
                <section className="py-10 items-center display flex justify-between">
                    <div className="hidden md:flex flex-col gap-4 w-1/4 text-gray-500 text-sm font-semibold">
                        <p>Who We Are</p>
                        <p>Our Mission</p>
                        <p>Our Vision</p>
                    </div>
                    <div className="w-full md:w-[calc(100% - 422px)]">
                        <h2 className="text-4xl font-bold mb-4 md:text-left text-center font-heading">Who We Are</h2>
                        <p className="text-gray-700 text-xl md:text-left text-center leading-relaxed font-body mb-4">
                            Molende Sports is a player development and management company dedicated to nurturing football talent in Africa. Through its Molende Training Program, it offers specialized training services, including fieldwork, strength & conditioning, rehab, and sports assessments. The company collaborates with top coaches, biokineticists, and performance specialists to help players reach professional levels.
                        </p>
                        <p className="text-gray-700 text-xl md:text-left text-center leading-relaxed font-body mb-4">
                            Additionally, Molende Management represents and guides players in their careers, securing opportunities locally and internationally through strategic partnerships with clubs, agencies, and organizations like Imbondeiro.
                        </p>
                        <p className="text-gray-700 text-xl md:text-left text-center leading-relaxed font-body">
                            With a strong focus on holistic player development, Molende Sports ensures athletes are physically, mentally, and tactically prepared for the demands of professional football.
                        </p>
                    </div>

                </section>

                {/* Large Image Section with Proper Scaling */}
                <div className="w-full">
                    <Image src="/base.jpg" alt="Our Work" className="w-full rounded-2xl object-cover h-40 md:h-72 lg:h-96" width={100} height={50} />
                </div>

                {/* Alternating Grid Sections */}
                <section className="py-10 mx-auto grid gap-10">
                    {/* First Grid Item - Image on Right */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="text-4xl font-bold font-heading mb-4">Our Commitment</h2>
                            <p className="text-gray-700 text-xl leading-relaxed font-body">
                                To empower athletes with tailored training and recovery programs, ensuring they perform at their peak while preventing injuries and optimizing recovery time.
                            </p>
                        </div>
                        <Image src="/base.jpg" alt="First Section" className="rounded-lg w-full h-72 md:h-96 object-cover order-1 md:order-2" width={100} height={100} />
                    </div>

                    {/* Second Grid Item - Image on Left */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <Image src="/base.jpg" alt="Second Section" className="rounded-lg w-full h-72 md:h-96 object-cover" width={100} height={100} />
                        <div>
                            <h2 className="text-4xl font-bold mb-4">Innovation & Growth</h2>
                            <p className="text-gray-700 text-lg leading-relaxed">
                                To revolutionize the way athletes train, recover, and perform by offering holistic, sciencebacked solutions that go beyond traditional training
                            </p>
                        </div>
                    </div>
                </section>
            </div>



            <Footer />
        </div>
    );
}
