import type { Metadata } from 'next';
import { ApprovalListTable } from '@/components/settings/ApprovalListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.settings.approvals;

export const metadata: Metadata = { title: texts.pageTitle };

export default function ApprovalsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <ApprovalListTable />
    </div>
  );
}
