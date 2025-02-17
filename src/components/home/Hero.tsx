export default function Hero() {
    return (
      <section className="relative w-full h-screen bg-cover bg-center flex items-center justify-center text-center text-white" 
        style={{ backgroundImage: "url('/base.jpg')" }}>
        <div className=" bg-opacity-50 p-8 rounded-lg">
          <h1 className="md:text-6xl text-xl font-heading antialiased font-bold">TRANSFORM PASSION INTO PRECISION</h1>
          <p className="text-lg  font-body mt-2">Personalized training & recovery solutions for serious athletes</p>
        </div>
      </section>
    );
  }
  