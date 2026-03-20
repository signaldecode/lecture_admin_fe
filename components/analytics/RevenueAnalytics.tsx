'use client';

import { CartesianGrid, Bar, BarChart, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { StatCard } from '@/components/composed/StatCard';
import { formatCurrency } from '@/lib/format';
import type { RevenueStats } from '@/types';

const mockData: RevenueStats[] = Array.from({ length: 14 }, (_, i) => ({
  date: `3/${7 + i}`,
  revenue: Math.floor(Math.random() * 5000000) + 1000000,
  orderCount: Math.floor(Math.random() * 30) + 5,
}));

const chartConfig = {
  revenue: { label: '매출', color: 'var(--chart-1)' },
};

export function RevenueAnalytics() {
  const totalRevenue = mockData.reduce((s, d) => s + d.revenue, 0);
  const totalOrders = mockData.reduce((s, d) => s + d.orderCount, 0);

  return (
    <div className="space-y-6 pt-4">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="총 매출" value={formatCurrency(totalRevenue)} icon="DollarSign" />
        <StatCard title="총 주문 수" value={totalOrders.toLocaleString()} unit="건" icon="CreditCard" />
        <StatCard title="건당 평균" value={formatCurrency(Math.round(totalRevenue / totalOrders))} icon="BarChart3" />
      </div>

      <Card>
        <CardHeader><CardTitle className="text-base">일별 매출 추이</CardTitle></CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-[300px] w-full">
            <BarChart data={mockData} accessibilityLayer>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={12} />
              <YAxis fontSize={12} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="revenue" fill="var(--color-revenue)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
