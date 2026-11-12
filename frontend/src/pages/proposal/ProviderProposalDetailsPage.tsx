
import { useParams } from "react-router";
import { Alert, Skeleton, Spin } from "antd";
import { useGetSingleProposalQuery } from "@/features/proposal/proposalApi";
import ProviderProposalDetails from "@/components/proposal/getMyProposals/ProviderProposalDetails";



const ProviderProposalDetailsPage = () => {
  const { proposalId } = useParams<{
    proposalId: string;
  }>();

  const {
    data: proposal,
    isLoading,
    isError,
    error,
  } = useGetSingleProposalQuery(proposalId!, {
    skip: !proposalId,
  });

  if (!proposalId) {
    return <Alert type="warning" message="Invalid proposal ID" />;
  }
  // Loading state
  if (isLoading) {
    return (
      <div className="mx-auto max-w-5xl space-y-6 p-6">
        <Skeleton active paragraph={{ rows: 2 }} />
        <Skeleton active paragraph={{ rows: 5 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

    // Error state
  if (isError) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <Alert
          type="error"
          showIcon
          title="Unable to load proposal"
          description={
            (error as any)?.data?.message ||
            "Something went wrong while fetching proposal details."
          }
        />
      </div>
    );
  }


    if (!proposal) {
    return (
      <div className="mx-auto max-w-5xl p-6">
        <Alert
          type="warning"
          showIcon
          title="Proposal not found"
          description="The requested proposal could not be found."
        />
      </div>
    );
  }

  return (
    <ProviderProposalDetails proposal={proposal.data} />
  );
};

export default ProviderProposalDetailsPage;
