import React, { useState } from 'react';

import { useGetAllCategoriesForHomePageQuery } from '@/features/home/homeApi';
import type { IGetAllCategoriesHome } from '@/types/home.types';
import { useNavigate } from 'react-router';
type CategoryProps = {
  isClientLogin?: boolean;
};
function HomeCategory({ isClientLogin = false }: CategoryProps) {
  const { data } = useGetAllCategoriesForHomePageQuery();
  console.log(data);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<IGetAllCategoriesHome['data'][number] | null>(null);
  return (
    <section className="my-10 grid place-items-center">
      {/* Top Heading */}
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">Services for Every Need</h2>
        <p className="text-gray-500 mt-2">
          Explore top categories and find the right service instantly
        </p>
      </div>
      {/* Category name  */}

      <h1 className="bg-linear-to-r from-blue-600 border-b-4 border-blue-700 mb-10 via-orange-600 to-blue-600 text-2xl font-bold bg-clip-text text-transparent ">
        Categories
      </h1>
      <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2  gap-10">
        {data?.data.map((cat) => {
          return (
            <h1
              key={cat._id}
              onClick={() => setSelected(cat)}
              className={`shadow-2xl h-20 grid place-items-center p-5 bg-linear-to-br from-blue-900 via-blue-800 to-blue-300 font-bold text-white cursor-pointer hover:scale-105 transition-all duration-300  ${selected?._id == cat._id && 'from-orange-500 via-orange-600 to-orange-700'}`}
            >
              {cat.name}
            </h1>
          );
        })}
      </section>
      {selected && selected.subCategories.length > 0 ? (
        <div className="grid place-items-center mt-10">
          <h1 className=" bg-linear-to-r from-blue-600 border-b-4 border-blue-700 mb-10 via-orange-600 to-blue-600 text-2xl font-bold bg-clip-text text-transparent ">
            Sub Categories
          </h1>

          <section className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-2  gap-10">
            {selected.subCategories?.map((sub) => {
              return (
                <h1
                  key={sub._id}
                  onClick={() =>
                    navigate(
                      isClientLogin
                        ? `/client/giglistings/${sub.slug} `
                        : `/giglistings/${sub.slug}`,
                    )
                  }
                  className={`shadow-xl font-bold text-white bg-blue-800 cursor-pointer h-20 grid place-items-center p-5  hover:scale-105 transition-transform`}
                >
                  {sub.name}
                </h1>
              );
            })}
          </section>
        </div>
      ) : (
        <h1 className="mt-10 bg-linear-to-r from-blue-600 border-b-4 border-blue-700 mb-10 via-orange-600 to-blue-600 text-2xl font-bold bg-clip-text text-transparent ">
          No Sub Categories Found
        </h1>
      )}
      <div className="flex mt-2 flex-wrap">{/* Selected category */}</div>
    </section>
  );
}

export default HomeCategory;
