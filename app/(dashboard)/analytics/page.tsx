import type { Metadata } from 'next';
import { getServerRole } from '@/lib/auth';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';

export const metadata: Metadata = { title: '통계/분석' };

export default async function AnalyticsPage() {
  const role = await getServerRole();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">통계/분석</h1>
      <AnalyticsDashboard role={role ?? 'SUPER_ADMIN'} />
    </div>
  );
}
