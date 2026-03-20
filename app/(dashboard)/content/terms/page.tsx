import type { Metadata } from 'next';
import { TermsEditor } from '@/components/content/TermsEditor';
import uiData from '@/data/uiData.json';

const texts = uiData.content.terms;

export const metadata: Metadata = { title: texts.pageTitle };

export default function TermsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <TermsEditor />
    </div>
  );
}
