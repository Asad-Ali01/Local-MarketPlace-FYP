import { useNavigate, useSearchParams } from "react-router";
import GigList from "../gig/giglisting/GigList";
import { ArrowRight, SearchX } from "lucide-react";
import { useGetSearchGigsWithCursorQuery, useSearchServicesQuery } from "@/features/search/searchApi";
import { useEffect, useRef, useState } from "react";
import type { ICursor } from "@/types/searchApi.types";
import type { IGig } from "@/types/gig.types";

function SearchServices() {
  const [searchParams] = useSearchParams();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const query = searchParams.get("q") ?? "";
  const navigate = useNavigate();
    const [cursor,setCursor] = useState<ICursor>()
  const {
    data,
    isLoading,
    isFetching,
    isError,
  } = useGetSearchGigsWithCursorQuery({limit:1,cursor});

    const [gigs,setGigs] = useState<IGig[] | []>(data?.data?.gigs ? data?.data.gigs: []);
  // Insert new gigs 
  useEffect(() => {
    const newGigs = data?.data.gigs;
    setGigs((prev) => [...prev,...(newGigs ?? [])]);
  },[data?.data])

  // Load more function call

  useEffect(() => {
    const element = loadMoreRef.current;
    if(!element) return;
    // if(isLoading) return;
    const observer = new IntersectionObserver((entries) => {
      console.log("OBserver");
      const entry = entries[0];
        if(entry.isIntersecting && !isFetching &&  !isLoading && data?.data.pagination.hasMore){
          handleLoadMoreGigs();
        }
    }
  )
    observer.observe(element);
    return () => observer.disconnect();
  },[])
  const handleLoadMoreGigs = () => {
    if(!data?.data?.pagination.hasMore || !data.data.pagination.nextCursor){
        return;
    }
    setCursor(data?.data?.pagination.nextCursor);
  }
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
    )
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
            "{query}"
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

        <header>
          <p className="text-sm font-medium text-purple-600">
            Search results
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Results for "{query}"
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            {gigs.length ?? 0} services found
          </p>
        </header>

        <div className="my-8 border-t" />

        <GigList gigs={gigs} />
   <div ref={loadMoreRef} className=" h-100 "/>
      </div>
    </main>
  );
}

export default SearchServices