import { Alert, Card, Skeleton, Tag, Empty } from 'antd';
import { ArrowLeft, BriefcaseBusiness, CalendarDays, Wallet } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useGetJobByIdApiQuery } from '@/features/job/jobApi';
import { useNavigate, useParams } from 'react-router';
import { useAppSelector } from '@/hooks/useAppDispatchSelector';

export default function JobDetails() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetJobByIdApiQuery(jobId ?? '', {
    skip: !jobId,
  });

  const job = response?.data;
  const currentUserId = useAppSelector((state) => state.auth.user?._id);
  const IsJobPostedByMe = response?.data.client._id === currentUserId;

  const formatDeadline = (deadline: string) => {
    const date = new Date(deadline);
    if (Number.isNaN(date.getTime())) return 'Not specified';

    return date.toLocaleDateString('en-PK', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatBudget = () => {
    if (!job) return '';

    const min = job.budgetMin.toLocaleString('en-PK');
    const max = job.budgetMax.toLocaleString('en-PK');

    return job.budgetType === 'fixed' ? `PKR ${min}` : `PKR ${min} – ${max}`;
  };

  if (!jobId) {
    return <Empty description="Invalid job link" />;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} />
          Back to jobs
        </Button>

        {isLoading ? (
          <Card className="rounded-2xl">
            <Skeleton active paragraph={{ rows: 8 }} />
          </Card>
        ) : isError || !job ? (
          <Alert
            type="error"
            showIcon
            message="Unable to load job details"
            description="The job may no longer be available. Please try again."
            action={
              <Button variant="outline" onClick={() => refetch()}>
                Retry
              </Button>
            }
          />
        ) : (
          <Card className="rounded-2xl border border-gray-200" styles={{ body: { padding: 28 } }}>
            <div className="flex flex-col gap-7">
              {/* Heading */}
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BriefcaseBusiness size={23} />
                </div>

                <div className="min-w-0 flex-1">
                  <h1 className="break-words text-2xl font-bold text-gray-900">{job.title}</h1>

                  <p className="mt-2 text-sm text-gray-500">{job.category}</p>
                </div>
              </div>

              <div>
                <Tag color={job.budgetType === 'fixed' ? 'blue' : 'purple'}>
                  {job.budgetType === 'fixed' ? 'Fixed price' : 'Budget range'}
                </Tag>
              </div>

              {/* Budget and deadline */}
              <div className="grid gap-4 rounded-xl bg-gray-50 p-5 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <Wallet size={20} className="mt-1 shrink-0 text-emerald-600" />

                  <div>
                    <p className="text-sm text-gray-500">Client budget</p>
                    <p className="mt-1 font-semibold text-gray-900">{formatBudget()}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CalendarDays size={20} className="mt-1 shrink-0 text-gray-500" />

                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="mt-1 font-medium text-gray-900">{formatDeadline(job.deadline)}</p>
                  </div>
                </div>
              </div>

              {/* Full description */}
              <section>
                <h2 className="mb-3 text-lg font-semibold text-gray-900">Project Description</h2>

                <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-600 [overflow-wrap:anywhere]">
                  {job.description}
                </p>
              </section>

              {/* Skills */}
              <section>
                <h2 className="mb-3 text-lg font-semibold text-gray-900">Required Skills</h2>

                <div className="flex flex-wrap gap-2">
                  {job.skills?.length ? (
                    job.skills.map((skill, index) => <Tag key={`${skill}-${index}`}>{skill}</Tag>)
                  ) : (
                    <p className="text-sm text-gray-500">No specific skills listed.</p>
                  )}
                </div>
              </section>

              <div className="border-t border-gray-100 pt-5">
                {IsJobPostedByMe ? (
                
                    <Button
                    variant="secondary"
                      className="w-full px-4 sm:w-auto"
                      onClick={() => {
                        navigate(`/client/jobs/update/${jobId}`)
                        // Proposal functionality will be added later.
                      }}
                      
                    >
                      Edit
                    </Button>
              
                 
                ) : (
                  <Button
                    className="w-full sm:w-auto"
                    onClick={() => {
                      // Proposal functionality will be added later.
                    }}
                  >
                    Send Proposal
                  </Button>
                )}
              </div>
            </div>
          </Card>
        )}
      </div>
    </main>
  );
}
