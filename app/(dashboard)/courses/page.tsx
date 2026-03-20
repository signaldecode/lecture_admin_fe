import type { Metadata } from 'next';
import { CourseListTable } from '@/components/courses/CourseListTable';
import uiData from '@/data/uiData.json';

const texts = uiData.courses;

export const metadata: Metadata = {
  title: texts.pageTitle,
};

export default function CoursesPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{texts.pageTitle}</h1>
      <CourseListTable />
    </div>
  );
}
