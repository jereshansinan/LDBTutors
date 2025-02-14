export default function StatisticsBar() {
    const stats = [
      { label: "Users", value: "10K+" },
      { label: "Projects Completed", value: "500+" },
      { label: "Customer Satisfaction", value: "98%" },
      { label: "Another", value: "98%" },
    ];
  
    return (
      <section className="bg-gray-900 text-white py-8">
        <div className="container mx-auto flex justify-around">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold">{stat.value}</p>
              <p className="text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    );
  }
  