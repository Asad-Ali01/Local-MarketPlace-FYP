import { Card, Tag, Button, Dropdown, Modal, message } from 'antd';
import type { MenuProps } from 'antd';
import { CalendarDays, Clock, Wallet, MoreVertical, Loader, Loader2 } from 'lucide-react';
import { useState } from 'react';
import type { IGetAllMyProposal } from '@/types/proposal.types';
import { useWithdrawProposalMutation } from '@/features/proposal/proposalApi';
import { useNavigate } from 'react-router';

interface ProposalCardProps {
  proposal: IGetAllMyProposal;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Pending', color: 'gold' },
  ACCEPTED: { label: 'Accepted', color: 'success' },
  REJECTED: { label: 'Rejected', color: 'error' },
  WITHDRAWN: { label: 'Withdrawn', color: 'default' },
};

const ProposalCard = ({ proposal }: ProposalCardProps) => {
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [withDrawProposalApi, { isLoading }] = useWithdrawProposalMutation();
  const job = proposal.job;
  const navigate = useNavigate()
  const status = statusConfig[proposal.status] ?? {
    label: proposal.status,
    color: 'default',
  };
  
  const formattedDate = new Date(proposal.createdAt).toLocaleDateString('en-PK', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  // Handle View Details
  const proposalId = proposal._id;
  const handleViewDetails = () => {
    // Add navigation later
    navigate(`/provider/proposals/${proposalId}`)
  };

  // Handle Withdraw Proposal
  const handleWithdraw = async (proposalId: string) => {
    try {
      await withDrawProposalApi(proposalId).unwrap();
      console.log()
      setIsWithdrawModalOpen(false);
    } catch (error:any) {
      const errMessage = error.data.message || "Proposal failed to withdrawn ."
      message.error(errMessage)
   
    }
  };

  const menuItems: MenuProps['items'] = [
    {
      key: 'view',
      label: 'View Details',
    },
     ...(proposal.status === "PENDING"
    ? [
        {
          key: "withdraw",
          label: "Withdraw Proposal",
          danger: true,
        },
      ]
    : []),
  ];

  const handleMenuClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'view') {
      handleViewDetails();
    }

    if (key === 'withdraw') {
      setIsWithdrawModalOpen(true);
    }
  };

  return (
    <>
      <Card className="!rounded-xl transition-shadow hover:shadow-md">
        <div className="flex flex-col gap-4">
          {/* Job information */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">{job?.title ?? 'Job no longer available'}</h3>

              <p className="mt-1 text-sm text-muted-foreground">Submitted on {formattedDate}</p>
            </div>

            <div className="flex items-center gap-3">
              <Tag color={status.color}>{status.label}</Tag>

              <Dropdown
                menu={{
                  items: menuItems,
                  onClick: handleMenuClick,
                }}
                trigger={['click']}
                placement="bottomRight"
              >
                <Button
                  type="text"
                  icon={<MoreVertical size={19} />}
                  // className="flex items-center justify-center "
                />
              </Dropdown>
            </div>
          </div>

          {/* Proposal details */}
          <p className="line-clamp-2 text-sm text-muted-foreground">{proposal.coverLetter}</p>

          <div className="grid grid-cols-1 gap-4 rounded-lg bg-muted/40 p-4 sm:grid-cols-3">
            <div className="flex items-center gap-2">
              <Wallet size={17} className="text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">Proposed Budget</p>
                <p className="font-semibold">PKR {proposal.proposedBudget.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={17} className="text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">Duration</p>
                <p className="font-semibold">{proposal.estimatedDuration}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={17} className="text-primary" />

              <div>
                <p className="text-xs text-muted-foreground">Budget Type</p>
                <p className="font-semibold capitalize">{proposal.budgetType}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Withdraw Confirmation Modal */}
      <Modal
        title="Withdraw Proposal"
        centered
        open={isWithdrawModalOpen}
        onCancel={() => setIsWithdrawModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsWithdrawModalOpen(false)}>
            Cancel
          </Button>,

          <Button
            key="withdraw"
            danger
            loading={isLoading}
            type="primary"
            onClick={() => handleWithdraw(proposal._id)}
          >
            Yes, Withdraw
          </Button>,
        ]}
      >
        <p>Are you sure you want to withdraw this proposal? This action may not be reversible.</p>
      </Modal>
    </>
  );
};

export default ProposalCard;
