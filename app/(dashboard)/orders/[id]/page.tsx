import type { Metadata } from 'next';
import { OrderDetailCard } from '@/components/orders/OrderDetailCard';
import type { Order } from '@/types';
import uiData from '@/data/uiData.json';

const ordersTexts = uiData.orders;

export const metadata: Metadata = {
  title: ordersTexts.detailTitle,
};

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

// TODO: Replace with actual API call
const mockOrder: Order = {
  id: 1002,
  memberName: '이영희',
  memberEmail: 'lee@example.com',
  courseTitle: 'TypeScript 마스터 클래스',
  amount: 69000,
  status: 'REFUND_REQUESTED',
  paymentMethod: '카드',
  createdAt: '2026-03-14T14:20:00',
};

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;

  // TODO: Fetch order data from API
  // const order = await apiClient.get<Order>(`/api/admin/orders/${id}`);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-2xl font-bold">
        {ordersTexts.detailTitle} (#{id})
      </h1>
      <OrderDetailCard order={mockOrder} />
    </div>
  );
}
