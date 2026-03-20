import type { Metadata } from 'next';
import { FaqListTable } from '@/components/support/FaqListTable';

export const metadata: Metadata = {
  title: 'FAQ 관리',
};

export default function SupportFaqPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">FAQ 관리</h1>
      <FaqListTable />
    </div>
  );
}
