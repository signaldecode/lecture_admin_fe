import type { Metadata } from 'next';
import { LogListTable } from '@/components/settings/LogListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.settings.logs;

export const metadata: Metadata = { title: texts.pageTitle };

export default function LogsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <LogListTable />
    </div>
  );
}
