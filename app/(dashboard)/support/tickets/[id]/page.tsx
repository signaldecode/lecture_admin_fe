import type { Metadata } from 'next';
import { TicketDetailCard } from '@/components/support/TicketDetailCard';
import type { SupportTicket } from '@/types';

export const metadata: Metadata = {
  title: '문의 상세',
};

interface TicketDetailPageProps {
  params: Promise<{ id: string }>;
}

// TODO: Replace with actual API call
const mockTicket: SupportTicket = {
  id: 1,
  memberName: '김철수',
  memberEmail: 'kim@example.com',
  title: '결제가 완료되었는데 강의가 보이지 않습니다',
  content: '어제 React 완전정복 강의를 결제했는데, 결제는 정상적으로 완료되었다고 나오지만 내 강의 목록에 해당 강의가 보이지 않습니다. 결제 확인 이메일은 수신했습니다. 확인 부탁드립니다.',
  status: 'PENDING',
  createdAt: '2026-03-20T09:00:00',
};

export default async function TicketDetailPage({ params }: TicketDetailPageProps) {
  const { id } = await params;

  // TODO: Fetch ticket data from API
  // const ticket = await apiClient.get<SupportTicket>(`support/tickets/${id}`);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">문의 상세 (ID: {id})</h1>
      <TicketDetailCard ticket={mockTicket} />
    </div>
  );
}
