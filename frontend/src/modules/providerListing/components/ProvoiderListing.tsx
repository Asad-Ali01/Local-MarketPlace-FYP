import React from "react";
import {
  Star,
  MapPin,
  BadgeCheck,
  Clock3,
  ArrowRight,
} from "lucide-react";
import { useGetAllGigsByCategoryQuery } from "@/features/gig/gigApi";
import { useParams } from "react-router";

function ProviderListing() {
    const {slug} = useParams<{slug:string}>();
  const {data} = useGetAllGigsByCategoryQuery(slug!,{skip:!slug})
  console.log("Here is data: ",data)
  const providers = [
    {
      id: 1,
      name: "John Doe",
      title: "Full Stack MERN Developer",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
      location: "Islamabad",
      rating: 4.9,
      reviews: 128,
      price: 25,
      completed: 210,
      verified: true,
      skills: ["React", "Node.js", "MongoDB", "TypeScript"],
    },
    {
      id: 2,
      name: "Alex Smith",
      title: "UI/UX Designer",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300",
      location: "Lahore",
      rating: 4.8,
      reviews: 82,
      price: 18,
      completed: 140,
      verified: true,
      skills: ["Figma", "Adobe XD", "UI Design"],
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Web Development Providers
      </h1>
  
      <div className="grid gap-6">
        {data?.data?.gigs.map((gig) => (
          <div
            key={gig._id}
            className="group rounded-2xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="flex flex-col gap-6 md:flex-row">
              {/* Avatar */}
              <div className="flex justify-center md:block">
                <img
                  src={gig.avatar.url}
                  alt={gig.title}
                  className="h-24 w-24 rounded-full object-cover border"
                />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-bold">
                        {gig.provider.name}
                      </h2>


                         {/* <BadgeCheck
                          size={20}
                          className="text-green-600"
                        /> */}
                    </div>

                    <p className="mt-1 text-gray-700 font-medium">
                      {gig.title}
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin size={16} />
                        {data.data.city}
                      </span>

                      <span className="flex items-center gap-1">
                        <Clock3 size={16} />
                        {gig.totalOrders} Jobs
                      </span>
                    </div>
                  </div>

                  <div className="text-left md:text-right">
                    <p className="text-3xl font-bold text-blue-700">
                      {gig.startingPrice ? `${gig.startingPrice} pkr` : "Contact for price"}
                    </p>

                   {gig.startingPrice && <p className="text-sm text-gray-500">
                      Starting Price
                    </p>}
                  </div>
                </div>

                {/* Rating */}
                <div className="mt-5 flex items-center gap-2">
                  <Star
                    className="fill-yellow-400 text-yellow-400"
                    size={18}
                  />

                  <span className="font-semibold">
                    {gig.rating}
                  </span>

                  <span className="text-gray-500">
                    ({gig.totalReviews} Reviews)
                  </span>
                </div>

                {/* Skills */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {gig.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Button */}
                <div className="mt-6 flex justify-end">
                  <button className="flex items-center gap-2 rounded-lg bg-blue-700 px-5 py-3 font-medium text-white transition hover:bg-blue-800">
                    View Profile
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProviderListing;