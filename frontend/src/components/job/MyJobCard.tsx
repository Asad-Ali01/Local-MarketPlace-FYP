import { Card, Tag } from 'antd';
import { BriefcaseBusiness, CalendarDays, Users, Wallet } from 'lucide-react';


import { Button } from '@/components/ui/button';
import type { IJob } from '@/types/job.types';
import { useNavigate } from 'react-router';

interface MyJobCardProps {
  job: IJob;
}

function getStatusColor(status: string) {
  switch (status.toLowerCase().replace(/[_-]/g, ' ').trim()) {
    case 'open':
      return 'green';
    case 'in progress':
    case 'inprogress':
      return 'processing';
    case 'completed':
    case 'complete':
      return 'default';
    default:
      return 'blue';
  }
}

function formatDate(dateValue: string) {
  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) return 'Not available';

  return date.toLocaleDateString('en-PK', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function MyJobCard({ job }: MyJobCardProps) {
  const navigate = useNavigate();

  const budget =
    job.budgetType === 'fixed'
      ? `PKR ${job.budgetMin.toLocaleString('en-PK')}`
      : `PKR ${job.budgetMin.toLocaleString('en-PK')} – ${job.budgetMax.toLocaleString('en-PK')}`;

  return (
    <Card
      hoverable
      className="h-full rounded-2xl border border-gray-200 transition-shadow hover:shadow-md"
      styles={{
        body: {
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          padding: 22,
        },
      }}
    >
      <div className="flex flex-1 flex-col gap-5">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <BriefcaseBusiness size={21} />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="break-words text-lg font-semibold text-gray-900">
              {job.title}
            </h2>
            <p className="mt-1 break-words text-sm text-gray-500">
              {job.category}
            </p>
          </div>
        </div>

        <div>
          <Tag color={getStatusColor(job.status)}>
            {job.status.replace(/[_-]/g, ' ')}
          </Tag>
        </div>

        <div className="grid grid-cols-2 gap-3 rounded-xl bg-gray-50 p-4">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Wallet size={16} />
              Budget
            </div>
            <p className="mt-2 break-words font-semibold text-gray-900">
              {budget}
            </p>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Users size={16} />
              Applications
            </div>
            <p className="mt-2 font-semibold text-gray-900">
              {job.applicationsCount ?? 0}
            </p>
          </div>
        </div>

        <div className="mt-auto flex items-center gap-2 text-sm text-gray-500">
          <CalendarDays size={16} />
          <span>Posted {formatDate(job.createdAt)}</span>
        </div>

        <Button
          type="button"
          variant="outline"
          className="mt-1 w-full"
          onClick={() => navigate(`/client/jobs/${job._id}`)}
        >
          View Details
        </Button>
      </div>
    </Card>
  );
}