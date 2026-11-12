import { Card, Statistic } from 'antd';
import { FileText, Clock, CheckCircle2, XCircle, Ban } from 'lucide-react';

interface ProposalStatsProps {
  stats: {
    total: number;
    pending: number;
    accepted: number;
    rejected: number;
    withdrawn: number;
  };
}

const ProposalStats = ({ stats }: ProposalStatsProps) => {
  const items = [
    {
      label: 'Total Proposals',
      value: stats.total,
      icon: FileText,
      color: '#6366f1',
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: Clock,
      color: '#d97706',
    },
    {
      label: 'Accepted',
      value: stats.accepted,
      icon: CheckCircle2,
      color: '#16a34a',
    },
    {
      label: 'Rejected',
      value: stats.rejected,
      icon: XCircle,
      color: '#dc2626',
    },
    {
      label: 'Withdrawn',
      value: stats.withdrawn,
      icon: Ban,
      color: '#64748b',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <Card key={item.label} className="!rounded-xl" styles={{ body: { padding: 18 } }}>
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{item.label}</span>

              <Icon size={19} color={item.color} />
            </div>

            <Statistic
              value={item.value}
              styles={{
                content: {
                  fontSize: 26,
                  fontWeight: 700,
                },
              }}
            />
          </Card>
        );
      })}
    </div>
  );
};

export default ProposalStats;
