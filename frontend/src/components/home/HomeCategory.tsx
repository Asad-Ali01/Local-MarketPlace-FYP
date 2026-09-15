
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Layers3 } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { useGetAllCategoriesForHomePageQuery } from '@/features/home/homeApi';
import type { IGetAllCategoriesHome } from '@/types/home.types';

type CategoryProps = {
  isClientLogin?: boolean;
};

function HomeCategory({ isClientLogin = false }: CategoryProps) {
  const { data, isLoading } = useGetAllCategoriesForHomePageQuery();

  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const categories = data?.data ?? [];

  const selectedCategory =
    categories.find((category) => category._id === selectedId) ?? null;

  const handleCategoryClick = (
    category: IGetAllCategoriesHome['data'][number],
  ) => {
    setSelectedId(category._id);
  };

  const handleSubCategoryClick = (slug: string) => {
    navigate(
      isClientLogin ? `/client/giglistings/${slug}` : `/giglistings/${slug}`,
    );
  };

  return (
    <section id='services' className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm">
            <Layers3 className="h-3.5 w-3.5 text-purple-600" />
            Explore our marketplace
          </div>

          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Services for Every Need
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Explore popular service categories and find the right professional
            for your next project.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-36 animate-pulse rounded-2xl border bg-muted/40"
              />
            ))}
          </div>
        )}

        {/* Categories */}
        {!isLoading && categories.length > 0 && (
          <div className="mt-12">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {categories.map((category, index) => {
                const isSelected = selectedId === category._id;

                return (
                  <motion.button
                    key={category._id}
                    type="button"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                    }}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCategoryClick(category)}
                    className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${
                      isSelected
                        ? 'border-purple-500 bg-purple-50 shadow-md shadow-purple-500/10 dark:border-purple-500 dark:bg-purple-950/20'
                        : 'border-border bg-card hover:border-purple-300 hover:shadow-md dark:hover:border-purple-800'
                    }`}
                  >
                    {/* Active indicator */}
                    {isSelected && (
                      <motion.div
                        layoutId="category-active"
                        className="absolute left-0 top-0 h-full w-1 bg-purple-600"
                      />
                    )}

                    <div className="flex items-start justify-between gap-3">
                      {/* Category Icon */}
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl transition-colors ${
                          isSelected
                            ? 'bg-purple-100 dark:bg-purple-900/40'
                            : 'bg-muted group-hover:bg-purple-50 dark:group-hover:bg-purple-950/30'
                        }`}
                      >
                        {category.icon?.url ? (
                          <img
                            src={category.icon.url}
                            alt={category.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <Layers3
                            className={`h-5 w-5 ${
                              isSelected
                                ? 'text-purple-600'
                                : 'text-muted-foreground'
                            }`}
                          />
                        )}
                      </div>

                      <ChevronRight
                        className={`mt-1 h-4 w-4 shrink-0 transition-transform duration-300 ${
                          isSelected
                            ? 'translate-x-1 text-purple-600'
                            : 'text-muted-foreground group-hover:translate-x-1'
                        }`}
                      />
                    </div>

                    <div className="mt-5">
                      <h3 className="line-clamp-1 text-sm font-semibold text-foreground sm:text-base">
                        {category.name}
                      </h3>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {category.subCategories?.length ?? 0}{' '}
                        {(category.subCategories?.length ?? 0) === 1
                          ? 'service'
                          : 'services'}
                      </p>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && categories.length === 0 && (
          <div className="mt-12 rounded-2xl border border-dashed p-10 text-center">
            <Layers3 className="mx-auto h-8 w-8 text-muted-foreground" />

            <h3 className="mt-4 font-semibold text-foreground">
              No categories available
            </h3>

            <p className="mt-1 text-sm text-muted-foreground">
              Please check back later for available services.
            </p>
          </div>
        )}

        {/* Selected Category / Subcategories */}
        {selectedCategory && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.4 }}
            className="mt-10"
          >
            <div className="rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
              {/* Subcategory Header */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-purple-600">
                    {selectedCategory.name}
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-foreground">
                    Explore Services
                  </h3>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Choose a service to find professionals offering it.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="self-start text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear selection
                </button>
              </div>

              {/* Subcategories */}
              {selectedCategory.subCategories?.length > 0 ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {selectedCategory.subCategories.map((subCategory, index) => (
                    <motion.button
                      key={subCategory._id}
                      type="button"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: index * 0.04,
                      }}
                      whileHover={{ x: 3 }}
                      onClick={() =>
                        handleSubCategoryClick(subCategory.slug)
                      }
                      className="group flex items-center justify-between rounded-xl border bg-background px-4 py-3 text-left transition-all hover:border-purple-300 hover:bg-purple-50/50 dark:hover:border-purple-800 dark:hover:bg-purple-950/20"
                    >
                      <div>
                        <p className="text-sm font-medium capitalize text-foreground">
                          {subCategory.name}
                        </p>

                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Explore professionals
                        </p>
                      </div>

                      <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-purple-600" />
                    </motion.button>
                  ))}
                </div>
              ) : (
                <div className="mt-6 rounded-xl border border-dashed p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No services are currently available in this category.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default HomeCategory;

