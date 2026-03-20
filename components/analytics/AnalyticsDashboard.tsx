'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MemberAnalytics } from '@/components/analytics/MemberAnalytics';
import { CourseAnalytics } from '@/components/analytics/CourseAnalytics';
import { RevenueAnalytics } from '@/components/analytics/RevenueAnalytics';
import type { AdminRole } from '@/types';

interface AnalyticsDashboardProps {
  role: AdminRole;
}

export function AnalyticsDashboard({ role }: AnalyticsDashboardProps) {
  const showMember = role === 'SUPER_ADMIN';

  return (
    <Tabs defaultValue={showMember ? 'members' : 'courses'}>
      <TabsList>
        {showMember && <TabsTrigger value="members">가입 통계</TabsTrigger>}
        <TabsTrigger value="courses">수강 통계</TabsTrigger>
        <TabsTrigger value="revenue">매출 통계</TabsTrigger>
      </TabsList>

      {showMember && (
        <TabsContent value="members">
          <MemberAnalytics />
        </TabsContent>
      )}
      <TabsContent value="courses">
        <CourseAnalytics />
      </TabsContent>
      <TabsContent value="revenue">
        <RevenueAnalytics />
      </TabsContent>
    </Tabs>
  );
}
