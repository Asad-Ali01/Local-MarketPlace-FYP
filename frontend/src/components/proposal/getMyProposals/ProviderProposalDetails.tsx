
import {
  Alert,
  Card,
  Tag,
  Button,
  Skeleton,
  Divider,
} from "antd";

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Wallet,
  BriefcaseBusiness,
  FileText,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router";
import DOMPurify from "dompurify";
import type { IGetSingleProposal } from "@/types/proposal.types";
import JobDetails from "@/components/job/JobDetails";



const statusConfig: Record<
  string,
  { label: string; color: string }
> = {
  PENDING: { label: "Pending", color: "gold" },
  ACCEPTED: { label: "Accepted", color: "success" },
  REJECTED: { label: "Rejected", color: "error" },
  WITHDRAWN: { label: "Withdrawn", color: "default" },
};
interface IGetSingleProposalProps{
    proposal:IGetSingleProposal;
 
}
const ProviderProposalDetails = ({proposal}:IGetSingleProposalProps) => {

  const navigate = useNavigate();


  const job = proposal.job;

  const status =
    statusConfig[proposal.status] ?? {
      label: proposal.status,
    //   color: "default",
    };

  const formattedDate = new Date(
    proposal.createdAt
  ).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const sanitizedCoverLetter = DOMPurify.sanitize(
    proposal.coverLetter || ""
  );

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button
          type="text"
          icon={<ArrowLeft size={18} />}
          onClick={() => navigate(-1)}
        />

        <div>
          <h1 className="text-2xl font-bold">
            Proposal Details
          </h1>

          <p className="text-sm text-muted-foreground">
            Review your submitted proposal and job information.
          </p>
        </div>
      </div>

      {/* Proposal Overview */}
      <Card className="!rounded-xl">
        <div className="flex flex-wrap items-start justify-between gap-4">

          <div>
            <p className="mb-2 text-sm text-muted-foreground">
              Submitted Proposal
            </p>

            <h2 className="text-xl font-semibold">
              {job?.title ?? "Job no longer available"}
            </h2>

            <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays size={16} />
              Submitted on {formattedDate}
            </p>
          </div>

          <Tag color={status.color}>
            {status.label}
          </Tag>

        </div>

        <Divider />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3">
              <Wallet size={21} className="text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Proposed Budget
              </p>

              <p className="text-lg font-semibold">
                PKR {proposal.proposedBudget.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3">
              <Clock size={21} className="text-primary" />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Estimated Duration
              </p>

              <p className="text-lg font-semibold">
                {proposal.estimatedDuration}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-3">
              <BriefcaseBusiness
                size={21}
                className="text-primary"
              />
            </div>

            <div>
              <p className="text-sm text-muted-foreground">
                Budget Type
              </p>

              <p className="text-lg font-semibold capitalize">
                {proposal.budgetType}
              </p>
            </div>
          </div>

        </div>
      </Card>

      {/* Your Proposal */}
      <Card className="!rounded-xl">
        <div className="mb-4 flex items-center gap-2">
          <FileText size={20} className="text-primary" />

          <h2 className="text-lg font-semibold">
            Your Proposal
          </h2>
        </div>

        <Divider />

        <div>
          <h3 className="mb-3 font-medium">
            Cover Letter
          </h3>

          <div
            className="prose prose-sm max-w-none break-words dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: sanitizedCoverLetter,
            }}
          />
        </div>

        <Divider />

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm text-muted-foreground">
              Proposal Status
            </p>

            <div className="mt-1 flex items-center gap-2">
              <CheckCircle2 size={17} className="text-primary" />

              <span className="font-medium">
                {status.label}
              </span>
            </div>
          </div>

          <Tag color={status.color}>
            {proposal.status}
          </Tag>
        </div>
      </Card>
      {/* Job Details */}
   

        <Divider />

        {job ? (
                      <JobDetails job={proposal.job}/>

        ) : (
          <Alert
            type="warning"
            showIcon
            title="Job no longer available"
            description="The original job information is no longer accessible."
          />
        )}
  

    </div>
  );
};

export default ProviderProposalDetails;
