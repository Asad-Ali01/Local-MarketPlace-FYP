function Testimonials() {
  const reviews = [
    {
      name: "Ali Khan",
      role: "Student",
      review:
        "Amazing service! Found a web developer in minutes. Highly recommended.",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sara Ahmed",
      role: "Business Owner",
      review: "Very professional platform. Helped me hire skilled freelancers",
    },
    {
      name: "Usman Tariq",
      role: "Startup Founder",
      review: "Great experience. Fast, reliable, and affordable services.",
      image: "https://randomuser.me/api/portraits/men/65.jpg",
    },
  ];

  return (
    <section className="w-full py-16 px-4 ">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          What Our Customers Say
        </h2>
        <p className="text-gray-500 mt-2">Real feedback from our happy users</p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {reviews.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300"
          >
            {/* User Info */}
            <div className="flex items-center text-black gap-4 mb-4">
              <img
                src={item.image}
                alt={item.name[0]}
                title={item.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">{item.role}</p>
              </div>
            </div>

            {/* Review */}
            <p className="text-gray-600 text-sm leading-relaxed">
              “{item.review}”
            </p>

            {/* Stars */}
            <div className="flex mt-4 text-yellow-400">⭐⭐⭐⭐⭐</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
