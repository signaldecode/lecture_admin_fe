import type { Metadata } from 'next';
import { PopupListTable } from '@/components/content/PopupListTable';

export const metadata: Metadata = { title: '팝업 관리' };

export default function PopupsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">팝업 관리</h1>
      <PopupListTable />
    </div>
  );
}
