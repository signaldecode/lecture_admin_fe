import type { Metadata } from 'next';
import { PublishRequestListTable } from '@/components/instructor/PublishRequestListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.instructor.publishRequests;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function InstructorPublishRequestsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <PublishRequestListTable />
    </div>
  );
}
