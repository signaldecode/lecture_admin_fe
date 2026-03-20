import type { Metadata } from 'next';
import { OrderListTable } from '@/components/orders/OrderListTable';
import uiData from '@/data/uiData.json';

const ordersTexts = uiData.orders;

export const metadata: Metadata = {
  title: ordersTexts.pageTitle,
};

export default function OrdersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{ordersTexts.pageTitle}</h1>
      <OrderListTable />
    </div>
  );
}
