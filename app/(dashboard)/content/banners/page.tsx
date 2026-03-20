import type { Metadata } from 'next';
import { BannerListTable } from '@/components/content/BannerListTable';

export const metadata: Metadata = { title: '배너 관리' };

export default function BannersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">배너 관리</h1>
      <BannerListTable />
    </div>
  );
}
