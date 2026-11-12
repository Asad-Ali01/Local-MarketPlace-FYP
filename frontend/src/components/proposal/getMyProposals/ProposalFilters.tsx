
import { Input, Select } from "antd";
import { Search } from "lucide-react";

export type ProposalStatusFilter =
  | "ALL"
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "WITHDRAWN";

interface ProposalFiltersProps {
  search: string;
  status: ProposalStatusFilter;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: ProposalStatusFilter) => void;
}

const ProposalFilters = ({
  search,
  status,
  onSearchChange,
  onStatusChange,
}: ProposalFiltersProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <Input
        allowClear
        size="large"
        placeholder="Search by job title..."
        prefix={<Search size={17} className="text-muted-foreground" />}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="sm:max-w-sm"
      />

      <Select
        size="large"
        value={status}
        onChange={onStatusChange}
        className="w-full sm:w-48"
        options={[
          { label: "All Proposals", value: "ALL" },
          { label: "Pending", value: "PENDING" },
          { label: "Accepted", value: "ACCEPTED" },
          { label: "Rejected", value: "REJECTED" },
          { label: "Withdrawn", value: "WITHDRAWN" },
        ]}
      />
    </div>
  );
};

export default ProposalFilters;
