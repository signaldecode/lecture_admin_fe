import type { Metadata } from 'next';
import { LogListTable } from '@/components/settings/LogListTable';

export const metadata: Metadata = { title: '활동 로그' };

export default function LogsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">활동 로그</h1>
      <LogListTable />
    </div>
  );
}
