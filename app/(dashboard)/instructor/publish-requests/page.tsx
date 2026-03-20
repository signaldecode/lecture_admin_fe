import type { Metadata } from 'next';
import { PublishRequestListTable } from '@/components/instructor/PublishRequestListTable';

export const metadata: Metadata = {
  title: '발행 요청',
};

export default function InstructorPublishRequestsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">발행 요청</h1>
      <PublishRequestListTable />
    </div>
  );
}
