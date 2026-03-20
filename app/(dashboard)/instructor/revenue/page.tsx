import type { Metadata } from 'next';
import { RevenueOverview } from '@/components/instructor/RevenueOverview';
import uiData from '@/data/uiData.json';

const texts = uiData.instructor.revenue;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function InstructorRevenuePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <RevenueOverview />
    </div>
  );
}
