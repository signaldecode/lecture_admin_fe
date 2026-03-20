'use client';

import { StatCard } from '@/components/composed/StatCard';
import { formatNumber, formatCurrency, formatPercent } from '@/lib/format';
import dashboardData from '@/data/dashboardData.json';
import type { AdminRole, DashboardSummary as DashboardSummaryType, InstructorDashboardSummary, CsDashboardSummary } from '@/types';

type SummaryData = DashboardSummaryType | InstructorDashboardSummary | CsDashboardSummary;

interface DashboardSummaryProps {
  role: AdminRole;
  data: SummaryData;
}

function formatValue(key: string, value: number): string {
  if (key.includes('Revenue') || key.includes('revenue')) return formatCurrency(value);
  if (key.includes('Rate') || key.includes('rate')) return formatPercent(value);
  return formatNumber(value);
}

export function DashboardSummary({ role, data }: DashboardSummaryProps) {
  const config =
    role === 'SUPER_ADMIN'
      ? dashboardData.superAdmin.summary
      : role === 'INSTRUCTOR'
        ? dashboardData.instructor.summary
        : dashboardData.csAgent.summary;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {config.map((item) => {
        const value = (data as unknown as Record<string, number>)[item.key] ?? 0;
        return (
          <StatCard
            key={item.key}
            title={item.label}
            value={formatValue(item.key, value)}
            unit={item.unit}
            icon={item.icon}
          />
        );
      })}
    </div>
  );
}
