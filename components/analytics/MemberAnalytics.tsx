'use client';

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { StatCard } from '@/components/composed/StatCard';
import type { MemberStats } from '@/types';

const mockData: MemberStats[] = Array.from({ length: 14 }, (_, i) => ({
  date: `3/${7 + i}`,
  newMembers: Math.floor(Math.random() * 50) + 10,
  totalMembers: 12000 + i * 30 + Math.floor(Math.random() * 20),
}));

const chartConfig = {
  newMembers: { label: '신규 가입', color: 'var(--chart-1)' },
};

export function MemberAnalytics() {
  const latest = mockData[mockData.length - 1];
  const totalNew = mockData.reduce((s, d) => s + d.newMembers, 0);

  return (
    <div className="space-y-6 pt-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="총 회원수" value={latest.totalMembers.toLocaleString()} unit="명" icon="Users" />
        <StatCard title="기간 내 신규 가입" value={totalNew.toLocaleString()} unit="명" icon="UserCheck" />
        <StatCard title="일 평균 가입" value={Math.round(totalNew / mockData.length).toLocaleString()} unit="명" icon="BarChart3" />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">신규 가입 추이</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <LineChart data={mockData} accessibilityLayer>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line type="monotone" dataKey="newMembers" stroke="var(--color-newMembers)" strokeWidth={2} dot={false} />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
