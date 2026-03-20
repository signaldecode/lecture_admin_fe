import type { Metadata } from 'next';
import { QnaListTable } from '@/components/instructor/QnaListTable';

export const metadata: Metadata = {
  title: 'Q&A 관리',
};

export default function InstructorQnaPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Q&A 관리</h1>
      <QnaListTable />
    </div>
  );
}
