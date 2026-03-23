import type { Metadata } from 'next';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { PopupListTable } from '@/components/content/PopupListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.content.popup;

export const metadata: Metadata = { title: texts.pageTitle };

export default function PopupsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
        <Link
          href="/content/popups/new"
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="h-4 w-4" />
          {texts.createButton}
        </Link>
      </div>
      <PopupListTable />
    </div>
  );
}
