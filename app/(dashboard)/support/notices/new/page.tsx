import type { Metadata } from 'next';
import { NoticeForm } from '@/components/support/NoticeForm';
import uiData from '@/data/uiData.json';

const texts = uiData.support.noticeForm;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function NewNoticePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <NoticeForm />
    </div>
  );
}
