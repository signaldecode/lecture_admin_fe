'use client';

import { useState, useEffect } from 'react';
import { DashboardSummary } from '@/components/dashboard/DashboardSummary';
import { AdminDashboardWidgets } from '@/components/dashboard/AdminDashboardWidgets';
import { InstructorDashboardWidgets } from '@/components/dashboard/InstructorDashboardWidgets';
import { CsDashboardWidgets } from '@/components/dashboard/CsDashboardWidgets';
import { Skeleton } from '@/components/ui/skeleton';
import { apiClient } from '@/lib/api';
import type {
  AdminRole,
  DashboardSummary as DashboardSummaryType,
  InstructorDashboardSummary,
  CsDashboardSummary as CsDashboardSummaryType,
  TrendData,
  Order,
  Ticket,
} from '@/types';

interface DashboardContentProps {
  role: AdminRole;
}

// Mock data for development (until backend is ready)
function getMockSummary(role: AdminRole) {
  if (role === 'SUPER_ADMIN') {
    return {
      totalMembers: 12543,
      totalRevenue: 158200000,
      totalCourses: 234,
      totalStudents: 8921,
      pendingTickets: 12,
      pendingRefunds: 3,
    } satisfies DashboardSummaryType;
  }
  if (role === 'INSTRUCTOR') {
    return {
      myStudents: 342,
      myRevenue: 12500000,
      myCourses: 5,
      completionRate: 78.5,
    } satisfies InstructorDashboardSummary;
  }
  return {
    pendingTickets: 8,
    todayTickets: 15,
    answeredToday: 7,
  } satisfies CsDashboardSummaryType;
}

const mockTrendData: TrendData[] = Array.from({ length: 7 }, (_, i) => ({
  date: `3/${14 + i}`,
  value: Math.floor(Math.random() * 5000000) + 1000000,
}));

const mockOrders: Order[] = [
  { id: 1, memberName: '김철수', memberEmail: 'kim@example.com', courseTitle: 'React 마스터클래스', amount: 89000, status: 'COMPLETED', paymentMethod: '카드', createdAt: '2026-03-19T10:30:00' },
  { id: 2, memberName: '이영희', memberEmail: 'lee@example.com', courseTitle: 'TypeScript 기초', amount: 59000, status: 'REFUND_REQUESTED', paymentMethod: '카드', createdAt: '2026-03-18T14:20:00' },
];

const mockTickets: Ticket[] = [
  { id: 1, memberName: '박민수', memberEmail: 'park@example.com', title: '결제 오류 문의', status: 'PENDING', createdAt: '2026-03-20T09:00:00', updatedAt: '2026-03-20T09:00:00' },
  { id: 2, memberName: '정수연', memberEmail: 'jung@example.com', title: '수강 기간 연장 요청', status: 'IN_PROGRESS', createdAt: '2026-03-19T16:45:00', updatedAt: '2026-03-20T08:30:00' },
];

const mockQna = [
  { id: 1, courseTitle: 'React 마스터클래스', question: 'useEffect 관련 질문입니다', studentName: '김학생', createdAt: '2026-03-20T08:00:00', isAnswered: false },
  { id: 2, courseTitle: 'TypeScript 기초', question: '제네릭 타입 사용법', studentName: '이학생', createdAt: '2026-03-19T15:30:00', isAnswered: true },
];

export function DashboardContent({ role }: DashboardContentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [summary, setSummary] = useState<DashboardSummaryType | InstructorDashboardSummary | CsDashboardSummaryType | null>(null);

  useEffect(() => {
    // TODO: Replace with actual API calls when backend is ready
    // const endpoint = role === 'INSTRUCTOR' ? 'instructor/dashboard/summary' : 'dashboard/summary';
    // apiClient.get(endpoint).then(setSummary);
    const timer = setTimeout(() => {
      setSummary(getMockSummary(role));
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [role]);

  if (isLoading || !summary) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] rounded-xl" />
          ))}
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <Skeleton className="h-[350px] rounded-xl" />
          <Skeleton className="h-[350px] rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardSummary role={role} data={summary} />

      {role === 'SUPER_ADMIN' && (
        <AdminDashboardWidgets
          revenueData={mockTrendData}
          recentOrders={mockOrders}
          recentTickets={mockTickets}
          pendingRefunds={(summary as DashboardSummaryType).pendingRefunds}
          pendingTickets={(summary as DashboardSummaryType).pendingTickets}
        />
      )}

      {role === 'INSTRUCTOR' && (
        <InstructorDashboardWidgets
          revenueData={mockTrendData}
          recentQna={mockQna}
        />
      )}

      {role === 'CS_AGENT' && (
        <CsDashboardWidgets recentTickets={mockTickets} />
      )}
    </div>
  );
}
