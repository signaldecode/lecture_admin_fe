import type { Metadata } from 'next';
import { CourseForm } from '@/components/courses/CourseForm';

export const metadata: Metadata = {
  title: '강의 수정',
};

interface CourseEditPageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseEditPage({ params }: CourseEditPageProps) {
  const { id } = await params;

  // TODO: Fetch course data from API
  // const course = await fetch(`${backendApiBase}/api/admin/courses/${id}`).then(r => r.json());

  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">강의 수정 (ID: {id})</h1>
      <CourseForm mode="edit" />
    </div>
  );
}
