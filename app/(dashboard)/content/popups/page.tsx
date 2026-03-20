import type { Metadata } from 'next';
import { PopupListTable } from '@/components/content/PopupListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.content.popup;

export const metadata: Metadata = { title: texts.pageTitle };

export default function PopupsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <PopupListTable />
    </div>
  );
}
