
import {
  Card,
  Tag,
  Descriptions,
  Typography,
  Divider,
  Space,
} from "antd";

import {
  BriefcaseBusiness,
  Wallet,
  Layers3,
} from "lucide-react";

import type { IPopulatedJob } from "@/types/proposal.types";
import type { IJob } from "@/types/job.types";

const { Title, Text, Paragraph } = Typography;

interface JobDetailsProps {
  job: IJob;
}

const statusConfig: Record<
  string,
  { label: string; color: string }
> = {
  open: { label: "Open", color: "success" },
  in_progress: { label: "In Progress", color: "processing" },
  completed: { label: "Completed", color: "blue" },
  cancelled: { label: "Cancelled", color: "error" },
};

const JobDetails = ({ job }: JobDetailsProps) => {
  const formatBudget = () => {
    const min = job.budgetMin.toLocaleString("en-PK");
    const max = job.budgetMax.toLocaleString("en-PK");

    return job.budgetType === "fixed"
      ? `PKR ${min}`
      : `PKR ${min} – ${max}`;
  };

  const status = statusConfig[job.status] ?? {
    label: job.status,
    color: "default",
  };

  return (
    <section>
      <Card
        className="!rounded-2xl border border-gray-200 shadow-sm"
        styles={{ body: { padding: 24 } }}
      >
        <Space align="center" size={12}>
          <BriefcaseBusiness
            size={22}
            className="text-primary"
          />

          <div>
            <Title level={4} className="!mb-0">
              Job Details
            </Title>

            <Text type="secondary">
              Information about the original job posting
            </Text>
          </div>
        </Space>

        <Divider />

        <Space
          direction="vertical"
          size={12}
          className="w-full"
        >
          <Title level={4} className="!mb-0 break-words">
            {job.title}
          </Title>

          <Tag color={status.color}>{status.label}</Tag>
        </Space>

        <Divider />

        <Descriptions
          bordered
          column={{ xs: 1, sm: 2 }}
          size="middle"
          items={[
            {
              key: "budget",
              label: (
                <Space>
                  <Wallet size={16} />
                  Client Budget
                </Space>
              ),
              children: (
                <Text strong className="text-base">
                  {formatBudget()}
                </Text>
              ),
            },
            {
              key: "budgetType",
              label: (
                <Space>
                  <Layers3 size={16} />
                  Budget Type
                </Space>
              ),
              children: (
                <Text strong className="capitalize">
                  {job.budgetType}
                </Text>
              ),
            },
          ]}
        />

        <Divider />

        <Title level={5} className="!mb-3">
          Project Description
        </Title>

        <Paragraph
          className="!mb-0 break-words whitespace-pre-wrap leading-7"
        >
          {job.description || "No description provided."}
        </Paragraph>
      </Card>
    </section>
  );
};

export default JobDetails;
