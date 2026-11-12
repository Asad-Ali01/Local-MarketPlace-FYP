
import {
  Alert,
  Card,
  Empty,
  Skeleton,
} from "antd";

import { Button } from "@/components/ui/button";

import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";

import { useGetJobByIdApiQuery } from "@/features/job/jobApi";

import { useAppSelector } from "@/hooks/useAppDispatchSelector";
import JobDetails from "@/components/job/JobDetails";


export default function JobDetailsPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();

  const {
    data: response,
    isLoading,
    isError,
    refetch,
  } = useGetJobByIdApiQuery(jobId ?? "", {
    skip: !jobId,
  });

  const job = response?.data;

  const currentUserId = useAppSelector(
    (state) => state.auth.user?._id
  );

  const isJobPostedByMe =
    job?.client?._id === currentUserId;

  // Invalid job ID
  if (!jobId) {
    return <Empty description="Invalid job link" />;
  }

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-4xl">

        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={18} />
          Back to jobs
        </Button>

        {/* Loading state */}
        {isLoading ? (
          <Card className="!rounded-2xl">
            <Skeleton active paragraph={{ rows: 8 }} />
          </Card>
        ) : isError || !job ? (
          /* Error state */
          <Alert
            type="error"
            showIcon
            title="Unable to load job details"
            description="The job may no longer be available. Please try again."
            action={
              <Button
                variant="outline"
                onClick={() => refetch()}
              >
                Retry
              </Button>
            }
          />
        ) : (
          /* Job details */
          <div className="space-y-6">

            <JobDetails job={job} />

            {/* Page-specific actions */}
            <div>
              {isJobPostedByMe ? (
                <Button
                  variant="secondary"
                  onClick={() =>
                    navigate(`/client/jobs/update/${jobId}`)
                  }
                >
                  Edit Job
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    navigate(`/provider/jobs/${job._id}/proposal`)
                  }
                >
                  Send Proposal
                </Button>
              )}
            </div>

          </div>
        )}
      </div>
    </main>
  );
}
