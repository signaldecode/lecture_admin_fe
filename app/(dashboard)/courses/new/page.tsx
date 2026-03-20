import type { Metadata } from 'next';
import { CourseForm } from '@/components/courses/CourseForm';
import uiData from '@/data/uiData.json';

const texts = uiData.courses.form;

export const metadata: Metadata = {
  title: texts.createTitle,
};

export default function NewCoursePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4">
      <h1 className="text-2xl font-bold">{texts.createTitle}</h1>
      <CourseForm mode="create" />
    </div>
  );
}
