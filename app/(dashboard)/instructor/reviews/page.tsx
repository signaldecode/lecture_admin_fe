import type { Metadata } from 'next';
import { ReviewListTable } from '@/components/instructor/ReviewListTable';

export const metadata: Metadata = {
  title: '수강평 관리',
};

export default function InstructorReviewsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">수강평 관리</h1>
      <ReviewListTable />
    </div>
  );
}
