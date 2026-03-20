import type { Metadata } from 'next';
import { ApprovalListTable } from '@/components/settings/ApprovalListTable';

export const metadata: Metadata = { title: '발행 승인' };

export default function ApprovalsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">발행 승인</h1>
      <ApprovalListTable />
    </div>
  );
}
