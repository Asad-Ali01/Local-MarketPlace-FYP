import { ArrowRight, SearchX } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router";

import { useGetAllGigsByCategoryQuery } from "@/features/gig/gigApi";
import GigList from "./GigList";


function GigListings() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const { data, isLoading, isError } =
    useGetAllGigsByCategoryQuery(slug!, {
      skip: !slug,
    });

  const gigs = data?.data ?? [];

  const categoryName = slug
    ? slug
        .split("-")
        .map(
          (word) =>
            word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ")
    : "Services";

  if (isLoading) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 w-64 rounded-lg bg-muted" />

          <div className="mt-3 h-4 w-96 max-w-full rounded bg-muted" />
        </div>

        <div className="mt-10 space-y-5">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-56 animate-pulse rounded-2xl border bg-muted"
            />
          ))}
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <SearchX className="mx-auto h-10 w-10 text-destructive" />

        <h1 className="mt-5 text-xl font-semibold">
          Unable to load services
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong while loading the services.
        </p>
      </section>
    );
  }

  if (gigs.length === 0) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <SearchX className="mx-auto h-10 w-10 text-muted-foreground" />

        <h1 className="mt-5 text-2xl font-bold">
          No services found
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          We couldn't find any professionals offering services in{" "}
          <span className="font-medium text-foreground">
            {categoryName}
          </span>{" "}
          right now.
        </p>

        <button
          type="button"
          onClick={() => navigate("/#services")}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-purple-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-purple-700"
        >
          Explore other services
          <ArrowRight className="h-4 w-4" />
        </button>
      </section>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <motion.header
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">
                Explore services
              </p>

              <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
                {categoryName}
              </h1>

              <p className="mt-2 max-w-2xl text-sm text-muted-foreground sm:text-base">
                Find skilled professionals offering{" "}
                {categoryName.toLowerCase()} services for your next
                project.
              </p>
            </div>

            <div className="rounded-xl border bg-card px-4 py-2.5 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                {gigs.length}
              </span>{" "}
              {gigs.length === 1 ? "service" : "services"} found
            </div>
          </div>
        </motion.header>

        <div className="my-8 border-t" />

        <GigList gigs={gigs} />
      </div>
    </main>
  );
}

export default GigListings;