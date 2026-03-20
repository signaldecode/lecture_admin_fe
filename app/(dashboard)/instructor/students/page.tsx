import type { Metadata } from 'next';
import { StudentListTable } from '@/components/instructor/StudentListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.instructor.students;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function InstructorStudentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <StudentListTable />
    </div>
  );
}
