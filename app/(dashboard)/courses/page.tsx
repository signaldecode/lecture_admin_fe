import type { Metadata } from 'next';
import { CourseListTable } from '@/components/courses/CourseListTable';

export const metadata: Metadata = {
  title: '강의 관리',
};

export default function CoursesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">강의 관리</h1>
      <CourseListTable />
    </div>
  );
}
