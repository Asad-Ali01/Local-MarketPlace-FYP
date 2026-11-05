import { Card, Skeleton } from 'antd';

export default function MyJobsSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="rounded-3xl">
          <Skeleton active paragraph={{ rows: 5 }} />
        </Card>
      ))}
    </div>
  );
}