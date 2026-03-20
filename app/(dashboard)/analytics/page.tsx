import type { Metadata } from 'next';
import { getServerRole } from '@/lib/auth';
import { AnalyticsDashboard } from '@/components/analytics/AnalyticsDashboard';
import uiData from '@/data/uiData.json';

const texts = uiData.analytics;

export const metadata: Metadata = { title: texts.pageTitle };

export default async function AnalyticsPage() {
  const role = await getServerRole();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <AnalyticsDashboard role={role ?? 'SUPER_ADMIN'} />
    </div>
  );
}
