import type { Metadata } from 'next';
import Link from 'next/link';
import { NoticeListTable } from '@/components/support/NoticeListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.support.notices;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function SupportNoticesPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
        <Link
          href="/support/notices/new"
          className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-primary px-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/80"
        >
          {texts.createButton}
        </Link>
      </div>
      <NoticeListTable />
    </div>
  );
}
