'use client';

import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentQnaTable } from '@/components/dashboard/RecentQnaTable';
import type { TrendData } from '@/types';

interface QnaItem {
  id: number;
  courseTitle: string;
  question: string;
  studentName: string;
  createdAt: string;
  isAnswered: boolean;
}

interface InstructorDashboardWidgetsProps {
  revenueData: TrendData[];
  recentQna: QnaItem[];
}

export function InstructorDashboardWidgets({
  revenueData,
  recentQna,
}: InstructorDashboardWidgetsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <RevenueChart data={revenueData} />
      <RecentQnaTable items={recentQna} />
    </div>
  );
}
