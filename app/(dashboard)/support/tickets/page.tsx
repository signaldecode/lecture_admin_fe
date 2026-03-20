import type { Metadata } from 'next';
import { TicketListTable } from '@/components/support/TicketListTable';

export const metadata: Metadata = {
  title: '1:1 문의',
};

export default function SupportTicketsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">1:1 문의</h1>
      <TicketListTable />
    </div>
  );
}
