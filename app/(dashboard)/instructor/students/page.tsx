import type { Metadata } from 'next';
import { StudentListTable } from '@/components/instructor/StudentListTable';

export const metadata: Metadata = {
  title: '내 수강생',
};

export default function InstructorStudentsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">내 수강생</h1>
      <StudentListTable />
    </div>
  );
}
