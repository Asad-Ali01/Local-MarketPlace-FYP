import MyJobCard from '@/components/job/MyJobCard';
import MyJobsSkeleton from '@/components/job/MyJobsSkeleton';
import { Button } from '@/components/ui/button';
import type { JobFilter } from '@/hooks/useMyJobs';
import useMyJobs from '@/hooks/useMyJobs';
import { Alert, Empty } from 'antd';
import { Plus, BriefcaseBusiness } from 'lucide-react';
import { useNavigate } from 'react-router';


const filters: JobFilter[] = [
  'All',
  'Open',
  'In Progress',
  'Completed',
];

export default function MyJobsPage() {
  const navigate = useNavigate();

  const {
    jobs,
    counts,
    activeFilter,
    setActiveFilter,
    isLoading,
    isError,
    refetch,
  } = useMyJobs();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        {/* Page heading */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              My Posted Jobs
            </h1>
            <p className="mt-2 text-sm text-gray-500 sm:text-base">
              Manage your jobs and review their details.
            </p>
          </div>

          <Button
            type="button"
            className="gap-2 self-start sm:self-auto"
            onClick={() => navigate('/client/jobs/create')}
          >
            <Plus size={18} />
            Post Job
          </Button>
        </div>

        {/* Status filters */}
        <div className="mt-8 flex flex-wrap gap-2 border-b border-gray-200 pb-4">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                {filter}
                <span
                  className={`rounded-md px-1.5 py-0.5 text-xs ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {counts[filter]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Job list */}
        <section className="mt-6">
          {isLoading ? (
            <MyJobsSkeleton />
          ) : isError ? (
            <Alert
              type="error"
              showIcon
              message="Unable to load your jobs"
              description="Please check your connection and try again."
              action={
                <Button variant="outline" onClick={() => refetch()}>
                  Retry
                </Button>
              }
            />
          ) : jobs.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  activeFilter === 'All'
                    ? 'You have not posted any jobs yet.'
                    : `You have no ${activeFilter.toLowerCase()} jobs.`
                }
              />

              {activeFilter === 'All' && (
                <Button
                  type="button"
                  className="mt-4 gap-2"
                  onClick={() => navigate('/jobs/create')}
                >
                  <Plus size={18} />
                  Post Your First Job
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing {jobs.length}{' '}
                  {jobs.length === 1 ? 'job' : 'jobs'}
                </p>

                <span className="flex items-center gap-1.5 text-xs text-gray-400">
                  <BriefcaseBusiness size={15} />
                  Client dashboard
                </span>
              </div>

              <div className="grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {jobs.map((job) => (
                  <MyJobCard key={job._id} job={job} />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </main>
  );
}