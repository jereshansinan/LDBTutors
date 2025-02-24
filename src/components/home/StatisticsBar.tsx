export default function StatisticsBar() {
  const stats = [
    { label: "Users", value: "10K+" },
    { label: "Projects Completed", value: "500+" },
    { label: "Customer Satisfaction", value: "98%" },
    { label: "Another", value: "98%" },
  ];

  return (
    <section className="bg-[#75E379] text-white py-8 px-2 md:px-4">
      <div className="md:mx-auto w-full md:max-w-[calc(100%-260px)] flex justify-between items-center gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <p className="text-sm sm:text-2xl md:text-5xl font-bold font-body text-black">{stat.value}</p>
            <p className="text-xs sm:text-sm md:text-lg font-body text-black whitespace-pre-line">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>

  );

}
