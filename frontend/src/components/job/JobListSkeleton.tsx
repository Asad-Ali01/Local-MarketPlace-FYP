
import { Card, Skeleton } from 'antd';

export default function JobListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="rounded-2xl">
          <Skeleton active paragraph={{ rows: 4 }} />
        </Card>
      ))}
    </div>
  );
}