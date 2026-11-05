import { Card, Tag } from 'antd';
import { BriefcaseBusiness, CalendarDays, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { IJob } from '@/types/job.types';
import { useNavigate } from 'react-router';
import RichTextDisplay from '../shared/RickTextDisplay';

interface Props {
  job: IJob;
}

export default function JobCard({ job }: Props) {
  const formatBudget = () => {
    const min = job.budgetMin.toLocaleString('en-PK');
    const max = job.budgetMax.toLocaleString('en-PK');

    return job.budgetType === 'fixed' ? `PKR ${min}` : `PKR ${min} – ${max}`;
  };

  const formatDeadline = () => {
    const date = new Date(job.deadline);

    if (Number.isNaN(date.getTime())) return 'Not specified';

    return date.toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };
  const navigate = useNavigate();
  return (
    <Card
      className="h-full overflow-hidden rounded-2xl border border-gray-200 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
      styles={{
        body: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: 24,
          minWidth: 0,
        },
      }}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-5">
        {/* Job heading */}
        <div className="flex min-w-0 items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <BriefcaseBusiness size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="break-words text-base font-semibold leading-6 text-gray-900 [overflow-wrap:anywhere]">
              {job.title}
            </h2>

            <p className="mt-1 break-words text-sm text-gray-500 [overflow-wrap:anywhere]">
              {job.category}
            </p>
          </div>
        </div>

        {/* Budget type */}
        <div>
          <Tag color={job.budgetType === 'fixed' ? 'blue' : 'purple'}>
            {job.budgetType === 'fixed' ? 'Fixed price' : 'Budget range'}
          </Tag>
        </div>

        {/* Description */}
        <div>
          <h1 ><b>Description</b></h1>
        <div className="line-clamp-3 min-h-[4.5rem] min-w-0 break-words text-sm leading-6 text-gray-600 [overflow-wrap:anywhere]">
         <RichTextDisplay content= {job.description}/>
        </div>
        </div>

        {/* Required skills */}
        {job.skills?.length > 0 && (
          <div className="flex  min-w-0 content-start flex-wrap gap-2">
            {job.skills.map((skill, index) => (
              <span
                key={`${skill}-${index}`}
                className="h-fit max-w-full break-words rounded-lg border border-gray-200 bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 [overflow-wrap:anywhere]"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* Budget and deadline */}
        <div className="mt-auto grid grid-cols-1 gap-4 border-t border-gray-100 pt-5 sm:grid-cols-2">
          <div className="flex min-w-0 items-start gap-3">
            <Wallet size={18} className="mt-1 shrink-0 text-emerald-600" />

            <div className="min-w-0">
              <p className="text-xs text-gray-500">Client budget</p>
              <p className="break-words font-semibold text-gray-900 [overflow-wrap:anywhere]">
                {formatBudget()}
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-start gap-3">
            <CalendarDays size={18} className="mt-1 shrink-0 text-gray-500" />

            <div className="min-w-0">
              <p className="text-xs text-gray-500">Deadline</p>
              <p className="break-words text-sm font-medium text-gray-700">{formatDeadline()}</p>
            </div>
          </div>
        </div>

        {/* Proposal button */}
        {/* Job actions */}
        <div className="mt-1 flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate(`/provider/jobs/${job._id}`)}
          >
            View Details
          </Button>

          <Button
            type="button"
            className="w-full"
            onClick={() => {
              // Proposal functionality will be added later.
            }}
          >
            Send Proposal
          </Button>
        </div>
      </div>
    </Card>
  );
}
