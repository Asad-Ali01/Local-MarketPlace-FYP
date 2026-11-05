import { useGetMyJobsApiQuery } from '@/features/job/jobApi';
import { useMemo, useState } from 'react';

export type JobFilter = 'All' | 'Open' | 'In Progress' | 'Completed';

function normalizeStatus(status: string = ''): JobFilter | 'Other' {
  const value = status.toLowerCase().replace(/[_-]/g, ' ').trim();

  if (value === 'open') return 'Open';
  if (value === 'in progress' || value === 'inprogress') {
    return 'In Progress';
  }
  if (value === 'completed' || value === 'complete') {
    return 'Completed';
  }

  return 'Other';
}

export default function useMyJobs() {
  const [activeFilter, setActiveFilter] = useState<JobFilter>('All');

  const { data: response, isLoading, isFetching, isError, refetch } = useGetMyJobsApiQuery();

  const jobs = response?.data.results ?? [];
  const counts = useMemo(
    () => ({
      All: jobs.length,
      Open: jobs?.filter((job) => normalizeStatus(job.status) === 'Open').length,
      'In Progress': jobs.filter((job) => normalizeStatus(job.status) === 'In Progress').length,
      Completed: jobs.filter((job) => normalizeStatus(job.status) === 'Completed').length,
    }),
    [jobs],
  );
  console.log("cpount: ",counts)
  const filteredJobs = useMemo(() => {
    if (activeFilter === 'All') return jobs;

    return jobs.filter((job) => normalizeStatus(job.status) === activeFilter);
  }, [jobs, activeFilter]);

  return {
    jobs: filteredJobs,
    counts,
    activeFilter,
    setActiveFilter,
    isLoading,
    isFetching,
    isError,
    refetch,
  };
}
