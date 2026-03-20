import type { Metadata } from 'next';
import { NoticeForm } from '@/components/support/NoticeForm';

export const metadata: Metadata = {
  title: '공지 작성',
};

export default function NewNoticePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">공지 작성</h1>
      <NoticeForm />
    </div>
  );
}
