'use client';

import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { RecentOrdersTable } from '@/components/dashboard/RecentOrdersTable';
import { RecentTicketsTable } from '@/components/dashboard/RecentTicketsTable';
import { SystemAlerts } from '@/components/dashboard/SystemAlerts';
import type { TrendData, Order, Ticket } from '@/types';

interface AdminDashboardWidgetsProps {
  revenueData: TrendData[];
  recentOrders: Order[];
  recentTickets: Ticket[];
  pendingRefunds: number;
  pendingTickets: number;
}

export function AdminDashboardWidgets({
  revenueData,
  recentOrders,
  recentTickets,
  pendingRefunds,
  pendingTickets,
}: AdminDashboardWidgetsProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <RevenueChart data={revenueData} />
      <SystemAlerts
        pendingRefunds={pendingRefunds}
        pendingTickets={pendingTickets}
      />
      <RecentOrdersTable orders={recentOrders} />
      <RecentTicketsTable tickets={recentTickets} />
    </div>
  );
}
