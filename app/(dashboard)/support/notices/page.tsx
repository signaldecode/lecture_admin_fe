import type { Metadata } from 'next';
import Link from 'next/link';
import { NoticeListTable } from '@/components/support/NoticeListTable';

export const metadata: Metadata = {
  title: '공지사항',
};

export default function SupportNoticesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">공지사항</h1>
        <Link
          href="/support/notices/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          공지 작성
        </Link>
      </div>
      <NoticeListTable />
    </div>
  );
}
