import type { Metadata } from 'next';
import { ReportListTable } from '@/components/community/ReportListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.community.reports;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function CommunityReportsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <ReportListTable />
    </div>
  );
}
