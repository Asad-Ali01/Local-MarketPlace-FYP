
import { Alert, Card, Skeleton, message } from 'antd';

import { Button } from '@/components/ui/button';
import { useGetJobByIdApiQuery } from '@/features/job/jobApi';
import { useNavigate, useParams } from 'react-router';
import UpdateJobForm from '@/components/job/UpdatejobForm';
import type { ServerValidationError } from '@/types/job.types';


export default function UpdateJobPage() {
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

  if (!jobId) {
    return <Alert type="error" message="Invalid job ID" showIcon />;
  }

  if (isLoading) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <Card>
          <Skeleton active paragraph={{ rows: 8 }} />
        </Card>
      </main>
    );
  }

  if (isError || !job) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <Alert
          type="error"
          showIcon
          message="Unable to load job"
          description="The job may not exist or you may not have permission to edit it."
          action={
            <Button variant="outline" onClick={() => refetch()}>
              Retry
            </Button>
          }
        />
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <Button
          type="button"
          variant="ghost"
          className="mb-4"
          onClick={() => navigate(-1)}
        >
          ← Back
        </Button>

        <Card
          title="Update Job"
          className="rounded-2xl"
          styles={{ body: { padding: 24 } }}
        >
          <p className="mb-6 text-sm text-gray-500">
            Update your project details and save your changes.
          </p>

          <UpdateJobForm
            job={job}
        
            onCancel={() => navigate(-1)}
            onUpdated={() => {
              message.success('Your changes have been saved');
              // navigate(`/jobs/${job._id}`);
            }}
          />
        </Card>
      </div>
    </main>
  );
}