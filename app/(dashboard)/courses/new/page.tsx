import type { Metadata } from 'next';
import { CourseForm } from '@/components/courses/CourseForm';

export const metadata: Metadata = {
  title: '강의 등록',
};

export default function NewCoursePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">강의 등록</h1>
      <CourseForm mode="create" />
    </div>
  );
}
