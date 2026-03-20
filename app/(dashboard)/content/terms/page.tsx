import type { Metadata } from 'next';
import { TermsEditor } from '@/components/content/TermsEditor';

export const metadata: Metadata = { title: '약관 관리' };

export default function TermsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">약관 관리</h1>
      <TermsEditor />
    </div>
  );
}
