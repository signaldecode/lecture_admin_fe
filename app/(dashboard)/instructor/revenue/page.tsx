import type { Metadata } from 'next';
import { RevenueOverview } from '@/components/instructor/RevenueOverview';

export const metadata: Metadata = {
  title: '매출/정산',
};

export default function InstructorRevenuePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">매출/정산</h1>
      <RevenueOverview />
    </div>
  );
}
