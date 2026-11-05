

import JobCard from './JobCard';
import type { IJob } from '@/types/job.types';

interface Props {
  jobs: IJob[];
}

export default function JobList({ jobs }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {jobs?.map((job) => (
        <JobCard key={job._id} job={job} />
      ))}
    </div>
  );
}