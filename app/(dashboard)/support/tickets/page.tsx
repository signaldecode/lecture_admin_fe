import type { Metadata } from 'next';
import { TicketListTable } from '@/components/support/TicketListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.support.tickets;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function SupportTicketsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <TicketListTable />
    </div>
  );
}
