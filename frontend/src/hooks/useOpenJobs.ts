import { useGetOpenJobsApiQuery } from "@/features/job/jobApi";


export default function useOpenJobs() {
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetOpenJobsApiQuery({ limit: 10 });

  return {
    jobs: data?.data.results ?? [],
    hasMore: data?.data.hasMore ?? false,
    nextCursor: data?.data.nextCursor ?? null,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}