import { motion } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  CheckCircle2,
  Clock3,
  MapPin,
  SearchX,
  Star,
} from 'lucide-react';
import { Image } from 'antd';
import { Link, useNavigate, useParams } from 'react-router';

import { useGetAllGigsByCategoryQuery } from '@/features/gig/gigApi';

function GigListings() {
  const { slug } = useParams<{ slug: string }>();

  const { data, isLoading, isError } = useGetAllGigsByCategoryQuery(slug!, {
    skip: !slug,
  });

  const navigate = useNavigate();

  const gigs = data?.data ?? [];

  /*
   * Convert the slug into a readable heading.
   * Example:
   * "web-development" -> "Web Development"
   */
  const categoryName = slug
    ? slug
        .split('-')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
    : 'Services';

  /*
   * Loading state
   */
  if (isLoading) {
    return (
      <section className="mx-auto  max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 w-64 rounded-lg bg-muted" />
          <div className="mt-3 h-4 w-96 max-w-full rounded bg-muted" />
        </div>

        <div className="mt-10 space-y-5 animate-pulse">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-56 rounded-2xl border bg-muted" />
          ))}
        </div>
      </section>
    );
  }

  /*
   * Error state
   */
  if (isError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <SearchX className="h-6 w-6 text-destructive" />
        </div>

        <h1 className="mt-5 text-xl font-semibold text-foreground">Unable to load services</h1>

        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          Something went wrong while loading the services. Please try again later.
        </p>
      </section>
    );
  }

  /*
   * Empty state
   */
  if (gigs.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
            <SearchX className="h-7 w-7 text-muted-foreground" />
          </div>

          <h1 className="mt-5 text-2xl font-bold text-foreground">No services found</h1>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            We couldn't find any professionals offering services in{' '}
            <span className="font-medium text-foreground">{categoryName}</span> right now.
          </p>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700"
          >
            Explore other services
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Explore services</p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {categoryName}
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Find skilled professionals offering {categoryName.toLowerCase()} services for your
                next project.
              </p>
            </div>

            {/* Results count */}
            <div className="rounded-xl border bg-card px-4 py-2.5 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{gigs.length}</span>{' '}
              {gigs.length === 1 ? 'service' : 'services'} found
            </div>
          </div>
        </motion.header>

        {/* Divider */}
        <div className="my-8 border-t" />

        {/* Listings */}
        <ul className="space-y-5">
          {gigs.map((gig, index) => (
            <motion.article
              key={gig._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.06,
              }}
              className="group rounded-2xl border bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-lg dark:hover:border-purple-900 sm:p-5"
            >
              <div className="flex flex-col gap-5 md:flex-row">
                {/* Gig Image */}
                <div className="shrink-0">
                  <Image
                    preview={false}
                    src={gig.avatar?.url}
                    alt={gig.title}
                    width={220}
                    height={160}
                    fallback="https://placehold.co/220x160?text=No+Image"
                    className="h-48 w-full rounded-xl object-cover sm:h-44 md:h-40 md:w-[220px]"
                  />
                </div>

                {/* Main Content */}
                <div className="min-w-0 flex-1">
                  {/* Top row */}
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      {/* Provider */}
                      <div className="flex items-center gap-2">
                        <h2 className="truncate text-base font-semibold text-foreground">
                          {gig.provider.name}
                        </h2>

                        <BadgeCheck size={17} className="shrink-0 fill-blue-50 text-blue-600" />
                      </div>

                      {/* Gig title */}
                      <h3 className="mt-1.5 line-clamp-2 text-lg font-semibold leading-6 text-foreground transition-colors group-hover:text-purple-600">
                        {gig.title}
                      </h3>

                      {/* Location + Orders */}
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {gig.location?.city || 'Location not specified'}
                        </span>

                        <span className="flex items-center gap-1.5">
                          <BriefcaseBusiness className="h-3.5 w-3.5" />
                          {gig.totalOrders} jobs completed
                        </span>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="shrink-0 sm:text-right">
                      {gig.startingPrice ? (
                        <>
                          <p className="text-xs text-muted-foreground">Starting from</p>

                          <p className="mt-0.5 text-xl font-bold text-foreground">
                            PKR {gig.startingPrice.toLocaleString()}
                          </p>
                        </>
                      ) : (
                        <p className="text-sm font-medium text-muted-foreground">
                          Contact for price
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />

                      <span className="text-sm font-semibold text-foreground">
                        {gig.rating ?? 'New'}
                      </span>
                    </div>

                    {gig.totalReviews > 0 && (
                      <span className="text-xs text-muted-foreground">
                        ({gig.totalReviews} {gig.totalReviews === 1 ? 'review' : 'reviews'})
                      </span>
                    )}
                  </div>

                  {/* Tags */}
                  {gig.tags?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {gig.tags.slice(0, 5).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors group-hover:border-purple-100 group-hover:bg-purple-50 group-hover:text-purple-700 dark:group-hover:border-purple-900 dark:group-hover:bg-purple-950/30 dark:group-hover:text-purple-300"
                        >
                          {tag}
                        </span>
                      ))}

                      {gig.tags.length > 5 && (
                        <span className="rounded-full border bg-muted/40 px-2.5 py-1 text-xs font-medium text-muted-foreground">
                          +{gig.tags.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Bottom row */}
                  <div className="mt-5 flex flex-col gap-3 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                      <span>Professional service</span>

                      <span className="mx-1">•</span>

                      <Clock3 className="h-3.5 w-3.5" />
                      <span>Available for work</span>
                    </div>

                    <Link
                      type="button"

                      to={`/gig/details/${gig._id}`}

                      className="group/button inline-flex items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-purple-700 hover:shadow-md hover:shadow-purple-500/20"
                    >
                      View Gig
                      <ArrowRight className="h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default GigListings;
