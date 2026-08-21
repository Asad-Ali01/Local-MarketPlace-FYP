function HeroStats() {
  const stats = [
    { value: "500+", label: "Services" },
    { value: "100+", label: "Freelancers" },
    { value: "Trusted", label: "By Students & Businesses" },
  ];

  return (
    <div className="flex justify-center my-10 gap-6 mt-6 flex-wrap">
      {stats.map((item, index) => (
        <div key={index} className="text-center bg-blue-800 text-white rounded p-2">
          <h3 className="text-xl font-bold  ">
            {item.value}
          </h3>
          <p className="text-sm text-gray-500">{item.label}</p>
        </div>
      ))}
    </div>
  );
}

export default HeroStats;