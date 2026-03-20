'use client';

import { RecentTicketsTable } from '@/components/dashboard/RecentTicketsTable';
import type { Ticket } from '@/types';

interface CsDashboardWidgetsProps {
  recentTickets: Ticket[];
}

export function CsDashboardWidgets({
  recentTickets,
}: CsDashboardWidgetsProps) {
  return (
    <div className="grid gap-4">
      <RecentTicketsTable tickets={recentTickets} />
    </div>
  );
}
