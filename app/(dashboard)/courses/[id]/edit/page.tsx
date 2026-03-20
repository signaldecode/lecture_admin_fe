import type { Metadata } from 'next';
import { CourseForm } from '@/components/courses/CourseForm';
import uiData from '@/data/uiData.json';

const texts = uiData.courses.form;

export const metadata: Metadata = {
  title: texts.editTitle,
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
      <h1 className="text-2xl font-bold">{texts.editTitle} (ID: {id})</h1>
      <CourseForm mode="edit" />
    </div>
  );
}
