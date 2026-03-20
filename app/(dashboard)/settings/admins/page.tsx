import type { Metadata } from 'next';
import { AdminListTable } from '@/components/settings/AdminListTable';

export const metadata: Metadata = { title: '관리자 계정' };

export default function AdminsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">관리자 계정</h1>
      <AdminListTable />
    </div>
  );
}
