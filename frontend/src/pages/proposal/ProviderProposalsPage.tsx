
import { useMemo, useState } from "react";
import { Button, Empty, Skeleton, Alert } from "antd";
import { RefreshCw, FileText } from "lucide-react";

import { useGetMyProposalsQuery } from "@/features/proposal/proposalApi";
import type { ProposalStatusFilter } from "@/components/proposal/getMyProposals/ProposalFilters";
import ProposalStats from "@/components/proposal/getMyProposals/ProposalStats";
import ProposalFilters from "@/components/proposal/getMyProposals/ProposalFilters";
import ProposalCard from "@/components/proposal/getMyProposals/ProposalCard";



const ProviderProposalsPage = () => {
  // API call
  const {
    data,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useGetMyProposalsQuery();

  // Local UI state
  const [search, setSearch] = useState("");
  const [status, setStatus] =
    useState<ProposalStatusFilter>("ALL");

  // Extract proposals from API response
  const proposals = data?.data ?? [];

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: proposals.length,

      pending: proposals.filter(
        (p) => p.status.toUpperCase() === "PENDING"
      ).length,

      accepted: proposals.filter(
        (p) => p.status.toUpperCase() === "ACCEPTED"
      ).length,

      rejected: proposals.filter(
        (p) => p.status.toUpperCase() === "REJECTED"
      ).length,

      withdrawn: proposals.filter(
        (p) => p.status.toUpperCase() === "WITHDRAWN"
      ).length,
    };
  }, [proposals]);

  // Search and status filtering
  const filteredProposals = useMemo(() => {
    return proposals.filter((proposal) => {
      const matchesSearch = (
        proposal.job?.title ?? ""
      )
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus =
        status === "ALL" ||
        proposal.status.toUpperCase() === status;

      return matchesSearch && matchesStatus;
    });
  }, [proposals, search, status]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton active paragraph={{ rows: 1 }} />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton.Button
              key={index}
              active
              block
              style={{ height: 100 }}
            />
          ))}
        </div>
        <Skeleton active paragraph={{ rows: 4 }} />
        <Skeleton active paragraph={{ rows: 4 }} />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert
        type="error"
        showIcon
        message="Unable to load your proposals"
        description="Something went wrong while retrieving your proposals."
        action={
          <Button
            icon={<RefreshCw size={15} />}
            onClick={() => refetch()}
          >
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            My Proposals
          </h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Track and manage the proposals you've submitted.
          </p>
        </div>

        <Button
          icon={<RefreshCw size={15} />}
          onClick={() => refetch()}
          loading={isFetching}
        >
          Refresh
        </Button>
      </div>

      {/* Statistics */}
      <ProposalStats stats={stats} />

      {/* Filters */}
      <div className="space-y-4">
        <ProposalFilters
          search={search}
          status={status}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
        />

        {/* Results */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {filteredProposals.length} of{" "}
            {proposals.length} proposals
          </p>
        </div>

        {filteredProposals.length === 0 ? (
          <div className="rounded-xl border border-dashed py-12">
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              imageStyle={{ height: 65 }}
              description={
                <div>
                  <p className="font-medium">
                    {proposals.length === 0
                      ? "No proposals yet"
                      : "No matching proposals found"}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {proposals.length === 0
                      ? "Start applying for jobs to see your proposals here."
                      : "Try changing your search or status filter."}
                  </p>
                </div>
              }
            />
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProposals.map((proposal) => (
              <ProposalCard
                key={proposal._id}
                proposal={proposal}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderProposalsPage;
