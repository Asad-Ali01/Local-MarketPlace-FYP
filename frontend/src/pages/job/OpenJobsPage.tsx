
import { Alert, Empty } from 'antd';
import { Button } from '@/components/ui/button';
import useOpenJobs from '@/hooks/useOpenJobs';
import JobListSkeleton from '@/components/job/JobListSkeleton';
import JobList from '@/components/job/JobList';


export default function OpenJobsPage() {
  const {
    jobs,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useOpenJobs();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-sm font-medium text-blue-600">
              Find your next opportunity
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Explore Jobs
            </h1>

            <p className="mt-2 text-gray-500">
              Discover projects that match your skills and expertise.
            </p>
          </div>

          <Button
            variant="outline"
            disabled={isFetching}
            onClick={() => refetch()}
          >
            {isFetching ? 'Refreshing...' : 'Refresh jobs'}
          </Button>
        </div>

        {isLoading ? (
          <JobListSkeleton />
        ) : isError ? (
          <div className="mx-auto max-w-2xl">
            <Alert
              type="error"
              showIcon
              message="Unable to load jobs"
              description="Please try again."
              action={
                <Button variant="outline" onClick={() => refetch()}>
                  Retry
                </Button>
              }
            />
          </div>
        ) : jobs.length === 0 ? (
          <div className="rounded-2xl bg-white py-16">
            <Empty description="No open jobs available right now" />
          </div>
        ) : (
          <>
            <p className="mb-5 text-sm text-gray-500">
              {jobs.length} {jobs.length === 1 ? 'job' : 'jobs'} available
            </p>

            <JobList jobs={jobs} />
          </>
        )}
      </div>
    </main>
  );
}