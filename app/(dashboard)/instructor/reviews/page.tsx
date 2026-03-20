import type { Metadata } from 'next';
import { ReviewListTable } from '@/components/instructor/ReviewListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.instructor.reviews;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function InstructorReviewsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <ReviewListTable />
    </div>
  );
}
