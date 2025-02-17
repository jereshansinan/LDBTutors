export default function StatisticsBar() {
  const stats = [
    { label: "Users", value: "10K+" },
    { label: "Projects Completed", value: "500+" },
    { label: "Customer Satisfaction", value: "98%" },
    { label: "Another", value: "98%" },
  ];
  
  return (
    <section className="bg-[#75E379] text-white py-8">
      <div className="px-2 md:mx-auto w-full md:max-w-[calc(100%-260px)] flex md:justify-around">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-sm sm:text-2xl md:text-5xl font-bold font-body text-black">{stat.value}</p>
            <p className="text-xs sm:text-sm md:text-lg font-body text-black">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
  
}
