import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
function HomeCategory() {
  const categories = [
    {
      categoryName: "Cleaners",
      categoryItems: [
        {
          name: "Home Cleaning",
          image: "HomeCategory/Cleaning/houseCleaning.jfif",
        },
        {
          name: "Carpet Cleaning",

          image: "HomeCategory/Cleaning/carpetCleaning.jfif",
        },
      ],
    },
    {
      categoryName: "Movers",
      categoryItems: [
        {
          name: "Packing and Unpacking",
          image: "HomeCategory/Movers/PackingAndUnpacking.jfif",
        },
        {
          name: "Long Distance Moving",
          image: "HomeCategory/Movers/LongDistance.jfif",
        },
        {
          name: "Furniture Moving",
          image: "HomeCategory/Movers/FurnitureMoving.jfif",
        },
      ],
    },
  ];
  const [selected, setSelected] = useState(categories[0]);
  return (
    <section className="my-10 grid place-items-center">
      {/* Top Heading */}
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
          Services for Every Need
        </h2>
        <p className="text-gray-500 mt-2">
          Explore top categories and find the right service instantly
        </p>
      </div>
      {/* Category name  */}
      <Carousel>
        <CarouselContent>
          {categories.map((cat) => (
            <CarouselItem
            key={cat.categoryName}
              className="basis-1/2 cursor-pointer"
              onClick={() => setSelected(cat)}
            >
              <h2 className=" font-bold bg-purple-600 text-blue-100  w-25  text-center rounded">
                {cat.categoryName}
              </h2>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious />
  <CarouselNext /> */}
      </Carousel>
      <div className="flex mt-2 flex-wrap">

      {/* Selected category */}
      {selected.categoryItems.map((sel) => (
        <div
          key={sel.name}
          className="relative m-3 w-60 overflow-hidden rounded-xl"
        >
          <img
            className="h-40 w-full cursor-pointer   hover:scale-110 transition-all duration-300 object-cover"
            src={`/${sel.image}`}
            alt={sel.name}
          />
          <div className="absolute inset-x-0 bottom-0 h-10 bg-linear-to-t from-black/80 via-black/30 to-transparent backdrop-blur-sm" />
          <h1 className="absolute bottom-3 left-3 right-3 text-sm font-bold text-white">
            {sel.name}
          </h1>
        </div>
      ))}
      </div>
    </section>
  );
}

export default HomeCategory;
