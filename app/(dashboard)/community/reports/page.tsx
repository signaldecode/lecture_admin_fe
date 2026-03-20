import type { Metadata } from 'next';
import { ReportListTable } from '@/components/community/ReportListTable';

export const metadata: Metadata = {
  title: '신고 관리',
};

export default function CommunityReportsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">신고 관리</h1>
      <ReportListTable />
    </div>
  );
}
