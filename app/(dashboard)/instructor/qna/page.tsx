import type { Metadata } from 'next';
import { QnaListTable } from '@/components/instructor/QnaListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.instructor.qna;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function InstructorQnaPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <QnaListTable />
    </div>
  );
}
